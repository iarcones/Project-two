var express = require("express");

var router = express.Router();
var axios = require("axios");
// Import the model (burger.js) to use its database functions.
var db = require("../models");


////////////// ROUTES
/////

// router.post("/profile", function (req, res) {
//     res.render("index-profile");
// })
/////
// first need to check if user is registered

router.get("/", function (req, res) {
    console.log("here")

    var userName = req.cookies.username;
    var userEmail = req.cookies.useremail;
    console.log("cookie in router.get: ", userName, userEmail)
    // ask if the cookie has a user logged in
    // if the user IS registered, the cookie has user
    // then we need to render index-registered
    // res.render("index-registered");

    if (typeof userName !== 'undefined') {
        console.log("not null")
        res.render("index-registered");
    }
    else {
        // if not, we do everything in /movies and render 'index'
        res.render("index");
    }
});




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
            res.send(movies)

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
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

router.get("/tv", function (req, res) {

    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    axios
        .get("https://api.themoviedb.org/3/discover/tv?api_key=32a91bda53591f9bf3267b9088686a93&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019")


        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            //console.log(response.data);

            // console.log(response)

            // console.log(response.data.results[0].title)
            var tv = response.data.results;
            // // console.log(data[0])
            // console.log("TV", tv);
            res.send(tv)

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
// new route here for API call
// router.get("/omdbmovies/:title", function (req, res) {

//     var title = req.body.title
//     var getMovieInfoURL="https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
//     // Run the axios.get function...
//     // The axios.get function takes in a URL and returns a promise (just like $.ajax)
//     axios
//         .get(getMovieInfoURL)


//         //https://api.themoviedb.org/3/movie/now_playing?api_key=32a91bda53591f9bf3267b9088686a93&primary_release_year=2018&sort_by=vote_average.desc

//         //https://api.themoviedb.org/3/discover/movie?api_key=32a91bda53591f9bf3267b9088686a93&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018

//         .then(function (response) {
//             // If the axios was successful...
//             // Then log the body from the site!
//             //console.log(response.data);

//             // console.log(response)

//             // console.log(response.data.results[0].title)
//             var movies = response.data.results;
//             // console.log(data[0])
//             console.log(movies);
//             res.send(movies)

//         })
//         .catch(function (error) {
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.log(error.response.data);
//                 console.log(error.response.status);
//                 console.log(error.response.headers);
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 // `error.request` is an object that comes back with details pertaining to the error that occurred.
//                 console.log(error.request);
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log("Error", error.message);
//             }
//             console.log(error.config);
//         });

// });


// users table here-post
router.post("/api/user", function (req, res) {
    user_name = req.body.name,
        user_email = req.body.email,
        first_name = req.body.firstname,
        last_name = req.body.lastname

    db.User.findOne({
        where: {
            user_email: user_email,
        }
    }).then(function (data) {
        console.log("data user ", data)
        if (data === null) {
            db.User.create({
                user_name: user_name,
                user_email: user_email,
                first_name: first_name,
                last_name: last_name

            })
                .then(function (data) {
                    res.json(data);
                });
        }
        res.json(data);
    });
});

// route to friends SQL table here
router.post("/api/friends", function (req, res) {

    db.Media.create({
        media_name: req.body.name,
        media_type: req.body.type,
        omdb_id: req.body.omdbid,
        user_rating: req.body.rating

    }).then(function (dbMedia) {

        res.json(dbMedia);
    });
});

// Media table here with all our API call
router.post("/api/media", function (req, res) {

    db.Media.create({
        media_name: req.body.name,
        media_type: req.body.type,
        omdb_id: req.body.omdbid,
        user_rating: req.body.rating

    }).then(function (dbMedia) {

        res.json(dbMedia);
    });
});

// Update media table here with all our API call when user inputs data
// should this be POST or PUT
router.post("/api/media/", function (req, res) {
    /// find Media if exist update and go to see if mediauser exist or not and update or create
    db.Media.update({
        omdb_id: req.body.omdbid,
        user_rating: req.body.rating

    }),
        { where: { id: id } }
            .then(function (dbMedia) {

                res.json(dbMedia);
            });


});

// Update media table here with all our API call when user inputs data
// should this be POST or PUT

router.post("/api/usermedia/:imdbid/:title", function (req, res) {
    /// find Media if exist update and go to see if mediauser exist or not and update or create
    var imdbid = req.params.imdbid;
    var title = req.params.title;
    db.Media.findOne({
        where: {
            omdb_id: imdbid
        }
    }).then(function (data) {
        console.log("data media ", data)
        if (data === null) {
            db.Media.create({
                omdb_id: imdbid,
                media_name: title

            }).then(function (data) {
                console.log("id: ", data.id)
                db.usermedia.create({
                    MediumId: data.id,
                    UserId: req.cookies.userid

                })
                    .then(function (data) {
                        res.json(data);
                    });
            })
        }
    })
})

router.get("/profile", function (req, res) {

    var userid = req.cookies.userid;

    // db.Customerburger.findAll({
    //     include: [{ association: 'Burger' }
    //     ],
    //     where: {
    //         CustomerId: customerId,
    //     },
    //     order: [
    //         ['counter', 'DESC']
    //     ],
    // }).then(function (dbBurgerCustomer) {
    //     hbsObject.burgerscustomer = dbBurgerCustomer;
    //     res.render("index", hbsObject);
    // });
    // db.Media.findAll({ 
    // }).then(function (usermedia) {
    //     console.log("usermedia", usermedia)

    //     var hbsObject = {
    //         usermedia: usermedia
    //     };
    //     res.render("index-profile", hbsObject);
    // });

    db.usermedia.findAll({ 
        include: [db.Media],
        where: {
                UserId: userid,
        }
    }).then(function (usermedia) {
        console.log("usermedia", usermedia)

        var hbsObject = {
            usermedia: usermedia
        };
        res.render("index-profile", hbsObject);
    });
    ////

    ////

});


// db.Media.update({
//     omdb_id: req.body.omdbid,
//     user_rating: req.body.rating

// }),
//     { where: { id: id } }
//         .then(function (dbMedia) {

//             res.json(dbMedia);
//         });




// get request for FRIENDS table
router.get("/api/friends/:id", function (req, res) {

    db.Friends.findAll({

    }),
        { where: { id: id } }
            .then(function (dbMedia) {
                res.json(dbMedia);
            });


});

////// OLEG

var APIcallsMyMovieSearch = {
    myMovieResult: function (queryURL) {
        //var placeHolder = {};
        return axios
            .get(queryURL)

    }
}

// }) +++
//currently this route handles the search for a single movie by logged in user
// var APIcallsMyMovieSearch = require("APIcallsMyMovieSearch");
router.post("/", function (req, res) {

    // var getMovieInfoURL="https://www.omdbapi.com/?t=" + req.body.movieTitle + "&y=&plot=short&apikey=trilogy";

    var getMovieInfoURL = "http://www.omdbapi.com/?s=" + req.body.movieTitle + "&page=all&apikey=trilogy";

    APIcallsMyMovieSearch.myMovieResult(getMovieInfoURL).then(function (response) {

        //console.log(response.data);
        var placeHolder = {};
        var namesAndYears = {};
        placeHolder = response.data;
        var topTen = 0;
        console.log(placeHolder);

        console.log("this Many " + response.data.Search.length);

        var movies = [];

        for (var i = 0; i < response.data.Search.length; i++) {
            var movie = {};
            movie.title = response.data.Search[i].Title;
            movie.year = response.data.Search[i].Year;
            movie.imdbid = response.data.Search[i].imdbID;
            movies.push(movie);
            // namesAndYears[response.data.Search[i].Title]=response.data.Search[i].Year;
        }
        var hbsObj = { movies };


        console.log(hbsObj);

        console.log(namesAndYears);
        res.render("index-registered", hbsObj);

    }).catch(function (error) {
        if (error.response) {

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
    //connection.query("INSERT INTO tasks (task) VALUES (?)", [req.body.task], function(err, result) {
    //if (err) throw err;
    //res.redirect("/");

    console.log("after redirect");
    console.log(res);
    console.log(req.body.movieTitle);
    // res.render("index",req.body.movieTitle);
    //});
});

module.exports = router;

// // find all search method
// db.Customermedia.findAll({
//     include: [{ association: 'Burger' }
//     ],
//     where: {
//         CustomerId: customerId,
//     },
//     order: [
//         ['counter', 'DESC']
//     ],
// }).then(function (dbMediaCustomer) {
//     hbsObject.mediacustomer = dbMediaCustomer;
//     res.render("index", hbsObject);
// });




// router.put("/api/devoured/:id/:customerId", function (req, res) {
//     burger = req.params.id;
//     client = req.params.customerId;

//     db.Burger.increment('burger_counter', { where: { id: req.params.id } }).then(function (data) {
//         console.log("client: ", client)
//         if (client !== 'null') {
//             console.log("client in the if: ", client)
//             db.Customerburger.increment('counter', { where: { BurgerId: burger, CustomerId: client } }).then(function (data) {

//                 /// if rec doesn't exist create and counter = 1;
//                 if (data[0][1] === (0)) {
//                     db.Customerburger.create(
//                         {
//                             BurgerId: burger,
//                             CustomerId: client
//                         })
//                         .then(function (dbcustomerburger) {
//                             res.json(dbcustomerburger);
//                         });
//                 }
//                 else {
//                     res.json(data);
//                 }
//             });
//         }
//         else {
//             res.json(data);
//         }
//     });

// });

