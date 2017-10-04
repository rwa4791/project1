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

// Clears all of the text-boxes
function clearInput(){

  $("#name-input").val("");
  $("#email-input").val("");
  $("#zipcode-input").val("");
  $("#interests-input").val("");

}

//
function populateVolunteer(){


}

//
function populateNYT(){



};

//
function populateTwitter(){
  
  //volunteer input
  var volunteer = $("#interests-input").val().trim();
  //Consumer API
  var apiKey = htOiKImfn0A61yArROEWS7mNk;
  //query URL
  var queryURL = "http://api.giphy.com/v1/gifs/search?q="+volunteer+"&api_key="+apiKey+"&rating=pg";

  //ajax call
    $.ajax({
      url: queryURL,
      method: "GET"
      }).done(function(response) {

        console.log(response);
        //loop through 10 times to generate 10 images
        for (var i = 0; i < 10; i++){

          //print in social div
            
        }

          
      });


};

//---------- API Calls ----------//

//




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

  //API calls
  //volunteer


  //NYT


  //twitter


  // Clears all of the text-boxes
  clearInput();

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
  
