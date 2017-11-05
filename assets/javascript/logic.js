var config = {
    apiKey: "AIzaSyD8TIvQZ0m7CVuHj7wJobyMVJvWLah4j80",
    authDomain: "test-e11a8.firebaseapp.com",
    databaseURL: "https://test-e11a8.firebaseio.com",
    projectId: "test-e11a8",
    storageBucket: "test-e11a8.appspot.com",
    messagingSenderId: "665883602172"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

$(document).ready(function() {

    // Get elements

    const txtEmail = $("#txtEmail");
    const txtPassword = $("#txtPassword");
    const btnLogin = $("#btnLogin");
    const btnSignUp = $("#btnSignUp");
    const btnLogout = $("#btnLogout");

    // add login event
    $("#btnLogin").on("click", e => {
        // Get email and passwork
        const email = txtEmail.val().trim();
        const pass = txtPassword.val().trim();
        const auth = firebase.auth();
        //Sign Up
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    // Add signup event
    $("#btnSignUp").on("click", e => {
        // TODO: Check for real email
        const email = txtEmail.val().trim();
        const pass = txtPassword.val().trim();
        const auth = firebase.auth();
        //Sign Up
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // signout
    $("#btnLogout").on("click", e => {
        firebase.auth().signOut();
    });


    // add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogout.show();
        } else {
            console.log('not logged in');
            btnLogout.hide();
        }
    });

    $("#submitButton").on("click", function(event) {
        event.preventDefault();

        var trainScheduler = {
            trainName: $("#train-name").val().trim(),
            destination: $("#destination").val().trim(),
            firstTrainTime: $("#first-time").val(),
            frequency: $("#frequency").val().trim()
        };

        console.log(trainScheduler);

        if (trainScheduler.trainName == "" && trainScheduler.destination == "" && trainScheduler.firstTrainTime == "" && trainScheduler.frequency == "") {
            return false;
        }
        // militaryTime = moment(firstTime).format('HHmm');
        // console.log(militaryTime);
        // totalBilled = (monthsWorked * monthlyRate);
        // console.log("total billed: " + totalBilled);

        database.ref().push(trainScheduler);

    });

    database.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrainTime);
        console.log(childSnapshot.val().frequency);

        // full list of items to the well
        $("#schedule-display").append("<tr><td id='name'> " + childSnapshot.val().trainName +
            " </td><td id='destination'> " + childSnapshot.val().destination +
            " </td><td id='frequency'> " + childSnapshot.val().frequency + "</td></tr>");

        // $(“.table”).append(“<td id=‘name’> ” + childSnapshot.val().employeename +
        // ” </td><td id=‘email’> ” + childSnapshot.val().role +
        // ” </td><td id=‘age’> ” + childSnapshot.val().startdate +
        // ” </td><td id=‘comment’> ” + childSnapshot.val().monthlyrate + ” </span></div>“);


        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
})