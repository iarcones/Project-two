console.log("*****************************************************")

var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

var db = require("./models");

var cookieParser = require('cookie-parser')

///////
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
/////

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/educatedguess_controller.js");

app.use(routes);
// app.use("/", routes);



// Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

