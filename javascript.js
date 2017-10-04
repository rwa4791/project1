//---------- Javascript for Index page ----------//

//---------- FIREBASE ----------//

var config = {
  apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs", /* DO WE NEED A DIFFERENT API KEY?*/
  authDomain: "time-sheet-55009.firebaseapp.com",
  databaseURL: "https://time-sheet-55009.firebaseio.com",
  projectId: //NEED//
  storageBucket: "time-sheet-55009.appspot.com"
  messagingSenderId: //NEED//
};

firebase.initializeApp(config);

var database = firebase.database();

//---------- FUNCTIONS ----------//

function populateVolunteer(){


}


function populateNYT(){



};

function populateTwitter(){



};

//---------- API Calls ----------//





//---------- CLICK EVENTS ----------//

$(".submit-button").on("click", function(event){

  //keeps form from submitting initially
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

  database.ref().push({
    
    newVolunteer

    });

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#email-input").val("");
  $("#zipcode-input").val("");
  $("#interests-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var vName = childSnapshot.val().name;
  var vEmail = childSnapshot.val().email;
  var vZipCode = childSnapshot.val().zipCode;
  var vInterests = childSnapshot.val().interests;

  // volunteer Info
  console.log(vName);
  console.log(vEmail);
  console.log(vZipCode);
  console.log(vInterests);

});
  
