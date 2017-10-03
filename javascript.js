var config = {
  apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs", /* DO WE NEED A DIFFERENT API KEY?*/
  authDomain: "time-sheet-55009.firebaseapp.com",
  databaseURL: "https://time-sheet-55009.firebaseio.com",
  storageBucket: "time-sheet-55009.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();


$(".submit-button").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#name-input").val().trim();
  var email = $("#email-input").val().trim();
  var zipCode = $("#zipcode-input").val().trim();
  var volunteer = $("#interests-input").val().trim();





  // Creates local "temporary" object for holding volunteer data
  var newVolunteer = {
    vName: name,
    vEmail: email,
    vZipCode: zipCode,
    vInterests: interests,
  };

  // Uploads volunteer data to the database
  database.ref().push(newVolunteer);

  // Logs everything to console
  console.log(newVolunteer.name);
  console.log(newVolunteer.email);
  console.log(newVolunteer.zipCode);
  console.log(newVolunteer.interests);

  // Alert
  alert("You were successfully added to the volunteer database"); /* DO WE WANT TO HAVE THIS ALERT */

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#email-input").val("");
  $("#zipcode-input").val("");
  $("#interests-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var vName = childSnapshot.val().name;
  var vEmail = childSnapshot.val().email;
  var vZipCode = childSnapshot.val().zipCode;
  var vInterests = childSnapshot.val().interests;

  // volunteer Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

  
