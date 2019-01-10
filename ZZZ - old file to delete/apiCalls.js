// Grab the axios package...
var module = { exports: {} };
var exports = module.exports;
var axios = require("axios");
var placeHolder = {};

// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
axios
  .get("https://api.themoviedb.org/3/discover/movie?api_key=32a91bda53591f9bf3267b9088686a93&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019")
  
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!//console.log(response.data);
    var topTen = 0;
    for (var i =0; i<40; i++){  ///WHERE TOP TEN GETS CREATED
      console.log(response.data.results[i].title);
      placeHolder[i]=[response.data.results[i].title,"https://image.tmdb.org/t/p/w600_and_h900_bestv2"+response.data.results[i].poster_path];
      
    };
    console.log(placeHolder);
    return placeHolder;
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

return module.exports;


// var movieName = "vice";
// //$(this).attr("data-name");

// var querySTR = function(movie){
//     str="https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
//     return str;
// }
// queryURL=querySTR(movieName);

var axios = require("axios");
var APIcallsMyMovieSearch = {
    myMovieResult: function (queryURL) {
        var placeHolder = {};
        return axios
            .get(queryURL)

    }
}
//APIcallsMyMovieSearch.myMovieResult();

module.exports = APIcallsMyMovieSearch;
