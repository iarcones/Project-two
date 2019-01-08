$(document).ready(function () {

  // // hide <div> with class of well on index.html when page loads
  $(".well").hide();

  // // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyDLk-BHKWaXv4zCAWa9Ekc51UalnuS5yjo",
  //   authDomain: "travelbook-1543375707755.firebaseapp.com",
  //   databaseURL: "https://travelbook-1543375707755.firebaseio.com",
  //   projectId: "travelbook-1543375707755",
  //   storageBucket: "travelbook-1543375707755.appspot.com",
  //   messagingSenderId: "329432180812",
  //   // Google Oauth client ID and discovery docs
  //   clientId: "329432180812-j5jie5pqjehkhoutg3qkuq7aohnsntl0.apps.googleusercontent.com"
  // };
  // firebase.initializeApp(config);

    // Initialize Firebase
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
  // Google authentication (underneath Firebase authorization)
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  //  Authenticate with Google 'on-click'
  $('#googleLogin').on('click', function signInGoogle() {
    console.log("googlelogin")
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // console.log(token);
      // The signed-in user info.
      var user = result.user;
      // console.log(user);
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      // console.log(errorCode);
      var errorMessage = error.message;
      // console.log(errorMessage)
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // console.log(credential);
    });
  });

  

  // Function to hide addToProfModal
  function addToProfileDone() {
    $('#addToProfModal').modal('hide');
  }

  

  // Sign out using built-in Firebase function on click of logout button
  $('#logout').on('click', function (e) {
    // Allow default of refresh page to trigger .on('child_added') below
    // Sign user out
    firebase.auth().signOut();
    // Log that user successfully signed out
    // console.log("Succesfully signed out");
  });

  // Open the loginSignUp modal when the button is clicked
  $('#loginSignUp').on('click', function (e) {
    // Prevent default action of refreshing page
    e.preventDefault();
    // Show LogIn modal on click of login button
    $("#loginModal").modal('show');

  });

  // ====================== login end ====================== //
  

  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  // --------------------- index page --------------------------------------------------------------------------------
  // Toggle Sign up Modal from loginModal if not a member
  $("body").on("click", "#toggleSignUpModal", function () {
    event.preventDefault();
    // Hide loginModal
    $("#loginModal").modal('hide');
    // Show Sign Up modal on click of Sign Up link
    $("#signUpModal").modal('show');
  });

  // Toggle Log in Modal from signUpModal if already a member
  $("body").on("click", "#toggleLogInModal", function () {
    // Prevent the default action of refreshing the page
    event.preventDefault();
    // Hide loginModal
    $("#signUpModal").modal('hide');
    // Show Sign Up modal on click of Sign Up link
    $("#loginModal").modal('show');
  });

  

  
});