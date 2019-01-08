$(document).ready(function () {

    // // // hide <div> with class of well on index.html when page loads
    // $(".well").hide();

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


    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');


    $('#googleLogin').on('click', function () {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            console.log("result");
            console.log(result);
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            console.log("error");
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    });


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user)
      // User is signed in.
    } else {
      console.log("no logged")
      // No user is signed in.
    }
  });

        // firebase.auth().signInWithRedirect(provider);


        // firebase.auth().getRedirectResult().then(function (result) {
        //     if (result.credential) {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         var token = result.credential.accessToken;
        //         console.log("token: ", token)
        //         // ...
        //     }
        //     // The signed-in user info.
        //     var user = result.user;
        //     console.log("user: ", user)
        // }).catch(function (error) {
        //     console.log("error1");
        //     console.log(error);
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        //     // ...
        // });

        // Sign out using built-in Firebase function on click of logout button
        $('#logout').on('click', function (e) {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
            }).catch(function (error) {
                // An error happened.
            });
        });




    });