
//---------- Javascript for Index page ----------//

//---------- FIREBASE ----------//
var config = {
    apiKey: "AIzaSyCxj--6HQZ_BVT0BBfeYpDY_C6ZnWSA3fA",
    authDomain: "volunteer-dc3b7.firebaseapp.com",
    databaseURL: "https://volunteer-dc3b7.firebaseio.com",
    projectId: "volunteer-dc3b7",
    storageBucket: "volunteer-dc3b7.appspot.com",
    messagingSenderId: "915346429716"
  };
 
 firebase.initializeApp(config);

var database = firebase.database();

$("#run-search").on("click", function(event){
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
 });

//--------- GLOBAL --------//

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
  console.log("VOLUNTEER: " +volunteer);
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

//---------- NYT -----------//
//NYT
function populateNYT() {

  //number of articles to populate
  var numArticles = 3;

  //API key
  var authKey = "0670364e971b486b99620ae260687e00";

  // Grabbing text the user typed into the search input
  var volunteer = $("#interests-input").val().trim();

  //queryURL
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=" + volunteer;

    //AJAX call
     $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(NYTData) {

        //Log queryURLBase and interestsInput
        console.log("------------------------------------");
        console.log("URL: " + queryURL);
        console.log("------------------------------------");

        // Log the NYTData to console, where it will show up as an object
        console.log("------------------------------------");
        console.log(NYTData);
        console.log("------------------------------------");

        $("#news").html("");
  
        // Loop through and provide the correct number of articles
        for (var i = 0; i < numArticles; i++) {

          // Create the HTML well (section) and add the article content for each
          var newsDiv = $("<div>");
          newsDiv.addClass("news" + [i]);
          newsDiv.attr("id", "data-news" + [i]);
          $("#news").append(newsDiv);

          if (NYTData.response.docs[i].headline !== "null") {
              $("#data-news" + [i])
                .append(
                  "<h3 class='articleHeadline'><span class='label label-primary'>" +
                  [i] + "</span><strong> " +
                  NYTData.response.docs[i].headline.main + "</strong></h3>"
                );
          };

          // If the article has a byline include the headline in the HTML
          if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
            $("#data-news" + [i])
              .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

          };

          // Then display the remaining fields in the HTML (Section Name, Date, URL)
          $("#data-news" + [i])
            .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
          $("#data-news" + [i])
            .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
          $("#data-news" + [i])
            .append(
              "<a href='" + NYTData.response.docs[i].web_url + "'>" +
              NYTData.response.docs[i].web_url + "</a>"
          );

        };
        
    });

};


//---------- API Calls ----------//

//




//---------- CLICK EVENTS ----------//

$(".submit-button").on("click", function(event){

  event.preventDefault();

  populateNYT();

  populateEventBrite();

  clearInput();

});



  
