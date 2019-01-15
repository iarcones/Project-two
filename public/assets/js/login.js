
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {

    var userName = readCookie("username");
    var userEmail = readCookie("useremail");
    var userID = readCookie("userid");

    
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

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');


    $('#googleLogin').on('click', function () {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // console.log("result");
            // console.log(result);
            var token = result.credential.accessToken;
            // The signed-in user info.
            var userName = result.user.displayName;
            var temp = userName.split(" ");
            var firstName = temp[0];
            var lastName = temp[1];
            var userEmail = result.user.email;
            console.log(userName, userEmail, firstName, lastName)
            // Send the POST request.
            var newUser = {
                name: userName,
                email: userEmail,
                firstname: firstName,
                lastname: lastName
            };
            $.ajax("/api/user", {
                type: "POST",
                data: newUser
            }).then(
                function (data) {
                    console.log("login creating cookies: ", data.id)
                    // Clear the previous cookie by setting it it equal to nothing and its expiration date to a past time
                    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                    document.cookie = "useremail; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                    document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                    document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                    document.cookie = "userid; expires=Thu, 01 Jan 1970 00:00:00 UTC";

                    // Store the username as a cookie using "document.cookie"
                    document.cookie = "userid=" + data.id + ";";
                    document.cookie = "username=" + userName + ";";
                    document.cookie = "useremail=" + userEmail + ";";
                    document.cookie = "firstname=" + firstName + ";";
                    document.cookie = "lastname=" + lastName + ";";
                    location.reload();
                });

        }).catch(function (error) {
            console.log("error");
            console.log(error);

        });

    });


    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         console.log("listener-user")
    //         console.log(user)
    //         // User is signed in.
    //     } else {

    //         // Clear the previous cookie by setting it it equal to nothing and its expiration date to a past time
    //         document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    //         document.cookie = "useremail; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    //         document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    //         document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    //         console.log("no logged")
    //         location.reload();
    //         // No user is signed in.
    //     }
    // });


    // Sign out using built-in Firebase function on click of logout button


    $('#logout').on('click', function (e) {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
             // Clear the previous cookie by setting it it equal to nothing and its expiration date to a past time
             document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
             document.cookie = "useremail=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
             document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
             document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
             document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
             console.log("no logged")
            //  location.reload();
                window.location.href = ("/")
            
        }).catch(function (error) {
            
            // An error happened.
        });
    });

    // NOTE: In order to modify cookies, we must access them over a secure connection e.i = https, localhost:
    // Needed to create this function to readCookies. Essentially it splits up the cookie list
    // See the working app at http://cookie-example-rcb.herokuapp.com/ or by opening with Firefox or Safari
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

});


