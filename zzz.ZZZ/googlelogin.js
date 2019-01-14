
    $(document).ready(function () {
        $('#googleLogin').on('click', function () {
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                console.log("result");
                console.log(result);
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user.displayName;
                console.log(user, email)
                var email = result.user.email;
                console.log(user, email)
    
                // ...
    
                db.User.create({
                    user_name: user,
                    user_email: email
                })
                    .then(function (data) {
                        console.log(data)
                        res.json(data);
                    });
    
            }).catch(function (error) {
                console.log("error");
                console.log(error);
    
                db.User.findOne({ where: {user_email: email} }).then(function (data) {
                console.log("data", data)
                  if (data){
                      console.log("rec exist");
                  }
                  else{
                      console.log("rec no exist");
                    db.User.create({
                        user_name: user,
                        user_email: email
                    })
                        .then(function (data) {
                            console.log(data)
                            res.json(data);
                        });
                  }
                  })
                  
                // console.log("error");
                // console.log(error);
                // // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // // The email of the user's account used.
                // var email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
            });
    
        });
    
    
        // firebase.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         console.log("listener-user")
        //         console.log(user)
        //         // User is signed in.
        //     } else {
    
        //         console.log("no logged")
        //         // No user is signed in.
        //     }
        // });
    
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
    
    
    