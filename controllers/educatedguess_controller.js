var express = require("express");

var router = express.Router();
var axios = require("axios");

var db = require("../models");


////////////// ROUTES

///////  HTML ROUTES

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

        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
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
            // If the axios was successful...Then log the body from the site!
            // save axious query into variable named `tv`
            var tv = response.data.results;
            // send this object/response to Handlebars
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

///////  API ROUTES

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
        // console.log("data user ", data)
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
        else { res.json(data) };
    });
});


// Update media table here with all our API call when user inputs data
// should this be POST or PUT

router.post("/api/usermedia/:themoviedbid/:title/:pic/:review/:rating", function (req, res) {
    /// find Media if exist update and go to see if mediauser exist or not and update or create
    var themoviedbid = req.params.themoviedbid;
    var title = req.params.title;
    var pic = req.params.pic;
    var review = req.params.review;
    var rating = req.params.rating;

    db.Media.findOne({
        where: {
            themoviedb_id: themoviedbid
        }
    }).then(function (data) {
        // console.log("data media ", data)
        if (data === null) {
            db.Media.create({
                themoviedb_id: themoviedbid,
                media_name: title,
                media_pic: pic

            }).then(function (data) {
                // console.log("id: ", data.id)
                db.usermedia.create({
                    MediumId: data.id,
                    UserId: req.cookies.userid,
                    myreview: review,
                    rating: rating
                })
                    .then(function (data) {
                        res.json(data);
                    });
            })
        } else {
            db.usermedia.create({
                MediumId: data.id,
                UserId: req.cookies.userid,
                myreview: review,
                rating: rating
            })
                .then(function (data) {
                    res.json(data);
                });
        }

    })
})

router.post("/api/usermedia/friend/:themoviedbid/:review/:rating", function (req, res) {
    /// find Media if exist update and go to see if mediauser exist or not and update or create
    var themoviedbid = req.params.themoviedbid;
    var review = req.params.review;
    var rating = req.params.rating;

    db.usermedia.create({
        MediumId: themoviedbid,
        UserId: req.cookies.userid,
        myreview: review,
        rating: rating
    })
        .then(function (data) {
            res.json(data);
        });
})






router.get("/profile", function (req, res) {

    var userid = req.cookies.userid;

    db.usermedia.findAll({
        include: [db.Media],
        where: {
            UserId: userid,
        }
    }).then(function (usermedia) {

        var hbsObject = {
            usermedia: usermedia
        };
        console.log(hbsObject)
        res.render("index-profile", hbsObject);
    });

});

router.post("/friendsinfo/:id", function (req, res) {
    console.log(req.params)
    var friendId = req.params.id;
    console.log("friendId", friendId)

    db.usermedia.findAll({
        include: [db.Media],
        where: {
            UserId: friendId,
        }
    }).then(function (usermedia) {

        var hbsObject = {
            usermedia: usermedia
        };
        console.log(hbsObject)
        res.render("index-friendinfo", hbsObject);
    });

});

router.delete("/api/usermedia/:id", function (req, res) {
    console.log("inside delete")
    var id = req.params.id;
    db.usermedia.destroy({
        where: { id: id }

    }).then(function (data) {
        console.log("delete: ", data);
        res.json(data);
    });
});

////// OLEG

// var ratingNumber = req.params.rating;
//     var ratingToSend = "";

//     function translateRatingToStar(ratinginput) {
//         var number = parseInt(ratinginput);
//         for (var i = 0; i < number; i++) {
//             ratingToSend += "*";
//         }
//         return ratingToSend;
//     }
//     rating = translateRatingToStar(ratingNumber);

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
router.post("/search", function (req, res) {

    var getMovieInfoURL = "https://api.themoviedb.org/3/search/movie?api_key=32a91bda53591f9bf3267b9088686a93&language=en-US&query=" + req.body.movieTitle + "&page=1&include_adult=false"

    APIcallsMyMovieSearch.myMovieResult(getMovieInfoURL).then(function (response) {

        var placeHolder = {};
        var namesAndYears = {};
        placeHolder = response.data.results;
        var topTen = 0;
        // console.log(placeHolder);

        console.log("this Many " + response.data.results.length);

        var movies = [];

        for (var i = 0; i < response.data.results.length; i++) {

            var movie = {};
            movie.pic = response.data.results[i].poster_path
            movie.title = response.data.results[i].title;
            movie.year = response.data.results[i].release_date.substr(0, 4);
            movie.id = response.data.results[i].id;
            movies.push(movie);
            // namesAndYears[response.data.Search[i].Title]=response.data.Search[i].Year;
        }
        var hbsObj = { movies };

        // console.log("EMPIEZA AQUI");
        // console.log(hbsObj);

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

    console.log("after redirect");

});


router.post("/searchfriends", function (req, res) {
    // route to friends SQL table here
    console.log("router post searchfriends");

    var friendName = req.body.friendname;

    db.User.findAll({
        where: {
            user_name: { like: '%' + friendName + '%' }
        }
    }).then(function (users) {
        console.log(users)
        var hbsObject = {
            users: users
        };
        console.log(hbsObject)
        res.render("index-friends", hbsObject);

    });

});


router.post("/api/addfriend/:id", function (req, res) {
    console.log("router get api/friends in search");
    console.log(req)
    var id = req.params.id;
    console.log("friendid: ", id)
    db.Friend.create({
        UserId: id,
        friendUserId: req.cookies.userid
    }).then(function (friend) {
        console.log(friend)
        res.json(friend);
    });
});

router.get("/friendspage", function (req, res) {

    var userid = req.cookies.userid;

    db.Friend.findAll({
        include: [db.User],
        where: {
            friendUserId: userid,
        }
    }).then(function (friends) {
        console.log(friends)
        var hbsObject = {
            friends: friends
        };
        console.log(hbsObject)
        res.render("index-friends", hbsObject);
    });

});

router.post("/invitefriends", function (req, res) {

    require('dotenv').config();
    var id = process.env.TWILIO_ACCOUNT_SID;
    var secret = process.env.TWILIO_TOKEN;

    console.log("I am in the invitefriends route-2", id)

    const client = require('twilio')(id, secret);

    console.log("I am in the invitefriends route-3")

    // route to friends SQL table here
    console.log("I clicked invite friend")
    var friendName = req.cookies.firstname;
    var phoneNumber = req.body.phonenumber;
    var friendId = req.cookies.userid;
    // // var invitation = "Your friend " + friendName + " invite you to join https://educatedguess.herokuapp.com/invited/" + friendId
    var invitation = "Your friend " + friendName + " invite you to join https://educatedguess.herokuapp.com/"


    client.messages
        .create({
            body: invitation,
            from: '+14155824287',
            to: phoneNumber
        })
        .then(message => console.log(message.sid)
        )
        .done(res.render("index-friends"));

});

module.exports = router;


