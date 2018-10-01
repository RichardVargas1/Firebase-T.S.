// Initialize My Firebase
var config = {
    apiKey: "AIzaSyC-vkq23j6nuHbd59zSm_3x8ENVNEaMHz0",
    authDomain: "train-station-43afd.firebaseapp.com",
    databaseURL: "https://train-station-43afd.firebaseio.com",
    projectId: "train-station-43afd",
    storageBucket: "train-station-43afd.appspot.com",
    messagingSenderId: "832732044975"
};

firebase.initializeApp(config);

var database = firebase.database();

// submit button "on click" function.
$("#addNewTrain").on("click", function(event) {
  event.preventDefault();

  
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    // Utilizing moment.js to establish/manage times.
    var trainTime = moment($("#trainTime").val().trim(), "HH:mm" ).format("HH:mm");
    
    //console.log(trainTime);
    var trainFrequency = $("#trainFrequency").val().trim();

    // Object variable containing the values from the linked index.HTML file.
    var newTrainAddition = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };


    database.ref().push(newTrainAddition);

    // Capturing values typed into HTML file.
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // Lines 52 - 60 are for time on this application.
    var tFrequency = trainFrequency;
    var firstTime = trainTime;
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");  
    var currentTime = moment();
    // Difference between the times established.
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFrequency;
    var tMinutesTillTrain = trainFrequency - tRemainder;
    var nextTrainAddition = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a");

    // Appending the variables to the HTML page.
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrainAddition + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

// I refered to the TrainPredictions activity to help alter the variables to impletment Moment.js,
// Trying to add timeschedules were a bit difficult. I tried setting different times to start with certain schedules.