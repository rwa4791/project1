//----- GLOBAL VARIABLES -----//

// Counter to keep track of article numbers as they come in
var articleCounter = 0;

//----- FUNCTIONS -----//

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery(numArticles, queryURLBase) {

  //AJAX call
 $.ajax({
    url: queryURLBase,
    method: "GET"
  }).done(function(NYTData) {

    //Log queryURLBase and interestsInput
    console.log("------------------------------------");
    console.log("URL: " + queryURLBase);
    console.log("------------------------------------");

    // Log the NYTData to console, where it will show up as an object
    console.log("------------------------------------");
    console.log(NYTData);
    console.log("------------------------------------");
  

    // Loop through and provide the correct number of articles
    for (var i = 0; i < numArticles; i++) {

      // Add to the Article Counter (to make sure we show the right number)
      //articleCounter++;

      // Create the HTML well (section) and add the article content for each
      var newsSelection = $("<div>");
      newsSelection.addClass("news" + [i]);
      newsSelection.attr("id", "data-number" + [i]);
      $("#news").append(newsSelection);

      
      // Confirm that the specific JSON for the article isn't missing any details
      // If the article has a headline include the headline in the HTML
      if (NYTData.response.docs[i].headline !== "null") {
        $("#data-number" + [i])
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            [i] + "</span><strong> " +
            NYTData.response.docs[i].headline.main + "</strong></h3>"
          );

        // Log the first article's headline to console
        console.log(NYTData.response.docs[i].headline.main);
      }

      /*
      // If the article has a byline include the headline in the HTML
      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        $("#data-number" + [i])
          .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

        // Log the first article's Author to console.
        console.log(NYTData.response.docs[i].byline.original);
      }

      // Then display the remaining fields in the HTML (Section Name, Date, URL)
      $("#news" + [i])
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
    */
    }

  });

}

// METHODS
// ==========================================================

// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  //prevents form from pushing thorugh on page load
  event.preventDefault();

  // Empties the region associated with the articles
  $("#news").clear();

  // Initially sets the articleCounter to 0
  articleCounter = 0;

  //API key
  var authKey = "0670364e971b486b99620ae260687e00";

  // Grabbing text the user typed into the search input
  var interestsInput = $("#interests-input");
  console.log("_--------asdfasdfas:" + interestsInput);

  //queryURL
  var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=" + interestsInput;

  // Number of results the user would like displayed
  numArticles = 5;

  // Then we will pass the final queryURL and the number of results to
  // include to the runQuery function
  runQuery(numArticles, queryURLBase);

  
  

});