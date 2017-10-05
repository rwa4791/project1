
//---------- Javascript for Index page ----------//

//---------- FIREBASE ----------//
/*

var config = {
  apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs", //DO WE NEED A DIFFERENT API KEY?//
  authDomain: "time-sheet-55009.firebaseapp.com",
  databaseURL: "https://time-sheet-55009.firebaseio.com",
  projectId: "NEED",
  storageBucket: "time-sheet-55009.appspot.com",
  messagingSenderId: "NEED"
};

firebase.initializeApp(config);

var database = firebase.database();

*/

//---------- FUNCTIONS ----------//

// Clears all of the text-boxes
function clearInput(){

  $("#name-input").val("");
  $("#email-input").val("");
  $("#zipcode-input").val("");
  $("#interests-input").val("");

}


//Eventbrite
function populateEventBrite(){

  //Consumer API
  var token = "VKVUSW3OILCLJSHPXTDU";
  //volunteer input
  var volunteer = $("#interests-input").val().trim();
  //zipcode input
  var zipCode = $("#zipcode-input").val().trim();
  //category ID
  var CharityAndCauses = "111";
  var CommunityAndCulture = "113";

  var categoryID = CharityAndCauses +","+ CommunityAndCulture;

  //queryURL
  var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token="+token+"&q="+volunteer+"&location.address="+zipCode+"&location.within=10mi&high_affinity_categories="+categoryID;

        //ajax call
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          
          console.log(queryURL);
          console.log(response);

          $("#events").html("");
          
        for (var i = 1; i < 4; i++){

          console.log("-------"+i+"-------");
          
          //name of the event
          console.log(response.events[i].name.text);
          var eventName = response.events[i].name.text;

          //event url on EventBrite
          console.log(response.events[i].url);
          var eventURL = response.events[i].url;

          //event description
          console.log(response.events[i].description.text);

          //src url logo of the event
          console.log(response.events[i].logo.url);
          var eventLogo = response.events[i].logo.url;

          //create a div to hold the events
          var eventDiv = $("<div>");

          eventDiv.html("<h3>" + eventName + "</h3>");

          eventDiv.attr("data-item", [i]);

          $("#events").append(eventDiv);
          
        };


        
      });

};



//---------- API Calls ----------//

//




//---------- CLICK EVENTS ----------//

$(".submit-button").on("click", function(event){

  event.preventDefault();

  populateEventBrite();

  clearInput();

});


/*
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
*/


  
