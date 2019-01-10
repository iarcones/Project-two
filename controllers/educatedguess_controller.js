var express = require("express");

var router = express.Router();
var axios = require("axios");
// Import the model (burger.js) to use its database functions.
var db = require("../models");
var firebase = require("firebase");

var firebase = require("firebase");

// // // hide <div> with class of well on index.html when page loads
// $(".well").hide();

// Initialize Firebase //// MOVE ALL OF THIS TO THE .env file
var config = {
    apiKey: "AIzaSyAQdQKzg61WjdyOQ3fFTnu5lX5Z6YOsw78",
    authDomain: "educated-guess.firebaseapp.com",
    databaseURL: "https://educated-guess.firebaseio.com",
    projectId: "educated-guess",
    storageBucket: "educated-guess.appspot.com",
    messagingSenderId: "950784072530",
    // Google Oauth client ID and discovery docs
    clientId:
        "950784072530-kr070pd267ccc8lae9iqkb1jv7fpa3og.apps.googleusercontent.com"
};
firebase.initializeApp(config);

// ====================== login start ======================//
var database = firebase.database();
// Assign a variable to equal the Firebase pathway to the Interests folder
var interestRef = database.ref('Interests')
// Assign a variable to equal the Firebase pathway to the Users folder
var usersRef = database.ref('Users')
// Assign a variable to hold the value of whether a user is logged in or not
var auth = null;
// Assign a variable to a blank string 'globally' so it can be reassigned when a user is authenticated (logged in)
var userID = "";


var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/userinfo.profile');




////////////// ROUTES

router.get("/", function (req, res) {
    var placeHolder = {};

    res.render("index");
});
// var topTen = 0;
// for (var i =0; i<10; i++){  ///WHERE TOP TEN GETS CREATED
//   console.log(response.data.results[i].title);
//   placeHolder[i]=[response.data.results[i].title,"https://image.tmdb.org/t/p/w600_and_h900_bestv2"+response.data.results[i].poster_path];

// };
// res.render
// console.log(placeHolder);

// return placeHolder;


// new route here for API call
router.get("/movies", function (req, res) {

    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    axios
        .get("https://api.themoviedb.org/3/discover/movie?api_key=32a91bda53591f9bf3267b9088686a93&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019")


        //https://api.themoviedb.org/3/movie/now_playing?api_key=32a91bda53591f9bf3267b9088686a93&primary_release_year=2018&sort_by=vote_average.desc

        //https://api.themoviedb.org/3/discover/movie?api_key=32a91bda53591f9bf3267b9088686a93&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018

        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            //console.log(response.data);

            // console.log(response)

            // console.log(response.data.results[0].title)
            var movies = response.data.results;
            // console.log(data[0])
            console.log(movies);
            res.send(movies)

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
        });

});


router.post("/api/burgers", function (req, res) {
    db.Burger.create({
        burger_name: req.body.name,
    })
        .then(function (dbBurger) {
            res.json(dbBurger);
        });
});

router.put("/api/devoured/:id/:customerId", function (req, res) {
    burger = req.params.id;
    client = req.params.customerId;

    db.Burger.increment('burger_counter', { where: { id: req.params.id } }).then(function (data) {
        console.log("client: ", client)
        if (client !== 'null') {
            console.log("client in the if: ", client)
            db.Customerburger.increment('counter', { where: { BurgerId: burger, CustomerId: client } }).then(function (data) {

                /// if rec doesn't exist create and counter = 1;
                if (data[0][1] === (0)) {
                    db.Customerburger.create(
                        {
                            BurgerId: burger,
                            CustomerId: client
                        })
                        .then(function (dbcustomerburger) {
                            res.json(dbcustomerburger);
                        });
                }
                else {
                    res.json(data);
                }
            });
        }
        else {
            res.json(data);
        }
    });

});

router.post("/api/customers", function (req, res) {

    db.Customer.create({
        customer_name: req.body.name,
    }).then(function (dbCustomer) {

        res.json(dbCustomer);
    });
});




module.exports = router;
