
//---------- Javascript for Index page ----------//

//---------- FIREBASE ----------//
/*var config = {
  apiKey: "AIzaSyBO52H3c_T6Mu5QtfDF74KIfA_xUm0jXpo",
  authDomain: "volunteerpulse-6159c.firebaseapp.com",
  databaseURL: "https://volunteerpulse-6159c.firebaseio.com",
  projectId: "volunteerpulse-6159c",
  storageBucket: "volunteerpulse-6159c.appspot.com",
  messagingSenderId: "914573645298"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#.submit-button").on("click", function(event){
  event.preventDefault();
  name = $("#name-input").val().trim();
  email = $("#email-input").val().trim();
  zipCode = $("#zipcode-input").val().trim();
  interest = $("#interests-input").val().trim();

   database.ref().push({
      name: name,
      email: email,
      zipCode: zipCode,
      interest: interest
    });


database.ref().on("child_added", function(snapshot) {
 console.log(snapshot.val());
 console.log(snapshot.val().interest);
$("#recentSearches").html(snapshot.val().interest);

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
//NYT
var authKey = "0670364e971b486b99620ae260687e00";
// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";
// Counter to keep track of article numbers as they come in
var articleCounter = 0;

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery(numArticles, queryURL) {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

 $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(NYTData) {

    // Logging the URL so we have access to it for troubleshooting
    console.log("------------------------------------");
    console.log("URL: " + queryURL);
    console.log("------------------------------------");

    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");

    // Loop through and provide the correct number of articles
    for (var i = 0; i < numArticles; i++) {

      // Add to the Article Counter (to make sure we show the right number)
      articleCounter++;

  // Create the HTML well (section) and add the article content for each
      var newsselection = $("<div>");
      newsselection.addClass("news1");
      newsselection.attr("id", "article-news1" + articleCounter);
      $("#news1").append(newsselection);      

// Confirm that the specific JSON for the article isn't missing any details
      // If the article has a headline include the headline in the HTML
      if (NYTData.response.docs[i].headline !== "null") {
        $("#article-news1" + articleCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            articleCounter + "</span><strong> " +
            NYTData.response.docs[i].headline.main + "</strong></h3>"
          );

        // Log the first article's headline to console
        console.log(NYTData.response.docs[i].headline.main);
      }

      // If the article has a byline include the headline in the HTML
      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        $("#news1" + articleCounter)
          .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

        // Log the first article's Author to console.
        console.log(NYTData.response.docs[i].byline.original);
      }

      // Then display the remaining fields in the HTML (Section Name, Date, URL)
      $("#newsselection" + articleCounter)
        .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
      $("#newsselection" + articleCounter)
        .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
      $("#newsselection" + articleCounter)
        .append(
          "<a href='" + NYTData.response.docs[i].web_url + "'>" +
          NYTData.response.docs[i].web_url + "</a>"
        );

      // Log the remaining fields to console as well
      console.log(NYTData.response.docs[i].pub_date);
      console.log(NYTData.response.docs[i].section_name);
      console.log(NYTData.response.docs[i].web_url);
    }
  });

}

// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks).
  event.preventDefault();

  // Initially sets the articleCounter to 0
  articleCounter = 0;

  // Empties the region associated with the articles
  $("#news").empty();

  // Grabbing text the user typed into the search input

  searchTerm = $("#interests-input").val().trim();
  var queryURL = queryURLBase + searchTerm;

  // Number of results the user would like displayed
  numResults = 5;

 
  // Then we will pass the final queryURL and the number of results to
  // include to the runQuery function
  runQuery(numResults, queryURL);
});

// This button clears the top articles section
$("#clear-all").on("click", function() {
  articleCounter = 0;
  $("#newsselection").empty();
});
*/

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


  
