
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


// // //---------- FUNCTIONS ----------// // //


//---------- CLEAR TEXT BOXES ----------//
function clearInput(){

  $("#name-input").val("");
  $("#email-input").val("");
  $("#zipcode-input").val("");
  $("#interests-input").val("");

};


//---------- FIREBASE ----------//






//---------- EVENTBRITE ----------//
function populateEventBrite(zipCode, volunteer){

  //Consumer API
  var token = "VKVUSW3OILCLJSHPXTDU";
  //volunteer input
  //var volunteer = $("#interests-input").val().trim();
  //console.log("VOLUNTEER: " +volunteer);
  //zipcode input
  //var zipCode = $("#zipcode-input").val().trim();
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

          //event URL
          var eventURL = response.events[i].url;

          //event description
          console.log(response.events[i].description.text);
          var eventDescription = response.events[i].description.text;
          var eventDisplay = eventDescription.slice(0,200) + "... ";

          //src url logo of the event
          console.log(response.events[i].logo.url);
          var eventLogo = response.events[i].logo.url;

          //create a div to hold the events
          var eventDiv = $("<div>");
          eventDiv.addClass("events" + [i]);
          eventDiv.addClass("alert");
          eventDiv.addClass("alert-secondary");
          eventDiv.attr("id", "data-events" + [i]);
          $("#events").append(eventDiv);

          console.log("START TIME: "+response.events[i].start.local);
          //take the date and convert it to more readable text
          var EventDate = response.events[i].start.local;

          var newEventDate = EventDate.slice(0,10);
          var newEventTime = EventDate.slice(11, EventDate.length);

          moment(newEventDate).format("YYYY-MM-DD");
          moment(newEventTime).format("HH:mm:ss");

          var clearEventDate = moment(newEventDate).format("ddd MM/DD/YYYY");

          var clearEventFinal = clearEventDate + ", " + newEventTime;


          //put clear date in div as badge
          $("#data-events" + [i])
            .append("<h3 class='badge badge-light'>" + clearEventFinal + "</h3>");

          //event name header        
          $("#data-events" + [i])
            .append(
              "<h4 class='articleHeadline alert-heading'><a target='_blank' href='"+eventURL+"'><strong> " +
              eventName + "</a></strong></h4>"
          );
          
          $("#data-events" + [i])
              .append("<h8>" + eventDisplay + "</h8>");

          };

      });

};


//---------- NYT -----------//
//NYT
function populateNYT(volunteer) {

  //number of articles to populate
  var numArticles = 10;

  //API key
  var authKey = "0670364e971b486b99620ae260687e00";

  // Grabbing text the user typed into the search input
  //var volunteer = $("#interests-input").val().trim();

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
          newsDiv.addClass("alert");
          newsDiv.addClass("alert-secondary");
          newsDiv.attr("id", "data-news" + [i]);
          $("#news").append(newsDiv);

          //take the date and convert it to more readable text
          var PubDate = NYTData.response.docs[i].pub_date;
          var newPubDate = PubDate.slice(0,10);
          moment(newPubDate).format("YYYY-MM-DD");
          var clearPubDate = moment(newPubDate).format("ddd MM/DD/YYYY");

          //put clear date in div as badge
          $("#data-news" + [i])
            .append("<h3 class='badge badge-light'>" + clearPubDate + "</h3>");

          //grab article URL
          var articleURL = NYTData.response.docs[i].web_url;

          if (NYTData.response.docs[i].headline !== "null") {
              $("#data-news" + [i])
                .append(
                  "<h4 class='articleHeadline alert-heading'><a target='_blank' href='"+articleURL+"'><strong> " +
                  NYTData.response.docs[i].headline.main + "</a></strong></h4>"
                );
          };

          // If the article has a byline include the headline in the HTML and snippet
          if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
            $("#data-news" + [i])
              .append("<h8><strong>" + NYTData.response.docs[i].byline.original + "</strong></h8><br>");
            $("#data-news" + [i])
              .append("<h8>" + NYTData.response.docs[i].snippet + "</h8>");

          };

        };
        
    });

};


//---------- ON PAGE LOAD ----------//

function pageLoad(){

  var volunteer = "volunteer";

  var zipCode = "10007";

  populateNYT(volunteer);

  populateEventBrite(zipCode, volunteer);

};

//---------- CALLED FUNCTIONS ----------//

window.onload = pageLoad();

//---------- CLICK EVENTS ----------//

  $(".submit-button").on("click", function(event){

    event.preventDefault();

    var volunteer = $("#interests-input").val().trim();

    var zipCode = $("#zipcode-input").val().trim();

    populateNYT(volunteer);

    populateEventBrite(zipCode, volunteer);

    clearInput();

    var i = 1;

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().limitToLast(5).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      console.log("------- SV -------");
      console.log(sv.interest);

      $("#data-search"+i).html(sv.interest);
      $("#data-search"+i).addClass("badge");
      $("#data-search"+i).addClass("searchBadge");
      $("#data-search"+i).addClass("badge-light");

      i++;
      
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


  });




  
