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
var role = "";
var startDate = "";
var monthlyRate = "";
var monthsWorked = "";
var totalBilled = "";

// Capture Button Click
$("#submitButton").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#employeename").val().trim();
    console.log(name);
    role = $("#role").val().trim();
    console.log(role);
    startDate = $("#startDate").val().trim();
    console.log(startDate);
    monthlyRate = $("#monthlyRate").val().trim();
    console.log(monthlyRate);


    monthsWorked = -(moment(startDate).diff(moment(), "months"));
    console.log("months worked" + monthsWorked);
    totalBilled = (monthsWorked * monthlyRate);
    console.log("total billed: " + totalBilled);

    // Code for "Setting values in the database"
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
        monthsWorked: monthsWorked,
        totalBilled: totalBilled
    });

});


database.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);





    // full list of items to the well
    $("#current-employees").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
        " </span><span id='email'> " + childSnapshot.val().role +
        " </span><span id='age'> " + childSnapshot.val().startDate +
        " </span><span id='comment'> " + childSnapshot.val().monthlyRate +
        " </span><span id='comment'> " + childSnapshot.val().monthsWorked +
        " </span><span id='comment'> " + childSnapshot.val().totalBilled + " </span></div>");


    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});