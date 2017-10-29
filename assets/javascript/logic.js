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

// Initial Values
var name = "";
var destination = "";
var firstTime = "";
var frequency = "";
// var monthsWorked = "";
// var totalBilled = "";

// Capture Button Click
$("#submitButton").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#train-name").val().trim();
    console.log(name);
    destination = $("#destination").val().trim();
    console.log(destination);
    firstTime = $("#first-time").val().trim();
    console.log(firstTime);
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    if (name == "" && destination == "" && firstTime == "" && frequency == "") {
        return false;
    }
    // monthsWorked = -(moment(startDate).diff(moment(), "months"));
    // console.log("months worked" + monthsWorked);
    // totalBilled = (monthsWorked * monthlyRate);
    // console.log("total billed: " + totalBilled);

    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
            // monthsWorked: monthsWorked,
            // totalBilled: totalBilled
    });

});


database.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().frequency);

    // full list of items to the well
    $("#schedule-display").append("<tr><td id='name'> " + childSnapshot.val().name +
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