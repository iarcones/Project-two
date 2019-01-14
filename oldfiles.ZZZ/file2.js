var APICalls = require("./APIcalls.js")
APICalls.topMovies().then(function(response) {
    //.then(function (response) {
        // If the axios was successful...
        // Then log the body from the site!
        //console.log(response.data);    var placeHolder = {};
        var placeHolder = {};

        var topTen = 0;
        for (var i = 0; i < 10; i++) {  ///WHERE TOP TEN GETS CREATED
          console.log(response.data.results[i].title);
          placeHolder[i] = [response.data.results[i].title, "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + response.data.results[i].poster_path];

        };
        console.log(placeHolder);
        return placeHolder;
      })
      .catch(function (error) {
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
    //   });

    
});