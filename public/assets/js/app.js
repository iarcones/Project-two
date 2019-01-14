$(document).ready(function () {
    // should this be above or outside of document.ready
    $('.carousel').carousel({
        interval: 0
    })

    $.get("/movies/")

        .then(function (data) {

            var active = (`<div class="carousel-item row no-gutters active">`);
            var noactive = (`<div class="carousel-item row no-gutters">`);

            var movieDiv = active;
            

            for (var i = 0; i < data.length; i++) {

                var j = 0;
                for (j = 0; j < 4 && i < data.length; j++) {

//ORIGNIAL: 
var detail = (`<div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i].poster_path}"></div>`)
                    //with add to list button
    //                 var detail = (`<div class="col-3 float-left">
                    
    //                 <div id="add2list">
    // <div class="content">
    //                 <img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i].poster_path}">
    //                 <a class = "glyphicon glyphicon-plus-sign" href="#">Add to list</a>
    //                 </div>     
    //               </div>
                    
    //                 </div>`)

                    var movie = movieDiv.concat(detail)
                    var movieDiv = movie;
                    i++;
                }
                i--
                

                $("#movie-display").append(movieDiv);
                var movieDiv = noactive;
            }

        })


    $.get("/tv")

        .then(function (data) {

            var active = (`<div class="carousel-item row no-gutters active">`);
            var noactive = (`<div class="carousel-item row no-gutters">`);

            var tvDiv = active;

            for (var i = 0; i < data.length; i++) {

                var j = 0;
                for (j = 0; j < 4 && i < data.length; j++) {

                    var detail = (`<div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i].poster_path}"></div>`)
                    var tv = tvDiv.concat(detail)
                    var tvDiv = tv;
                    i++;

                }
                i--

                $("#tv-display").append(tvDiv);
                var tvDiv = noactive;
            }

        })


    // delete movies to your profile
    $(".delete").on("click", function (event) {
        console.log("I clicked delete", event)
        var themoviedbid = $(this).data("id");
        console.log("themoviedbid", themoviedbid)
        // Send the PUT request.
        $.ajax("/api/usermedia/" + themoviedbid, {
            type: "DELETE",
            data: true
        }).then(
            function () {
                console.log("return")
                // Reload the page to get the updated list
                location.reload();
            }
        );

    });

    $('#modalrating').on('show.bs.modal', function (event) {
        var id = $(event.relatedTarget).data('id');
        var title = $(event.relatedTarget).data('title');
        var pic = $(event.relatedTarget).data('pic');
   
        var temp = (`<button class="btn-sm btn-success" id="save-button" data-toggle="modal" data-target="#modalrating" data-id="${id}" data-title="${title}" data-pic="${pic}">Add to Saved!</button>`)
        var title = (`<h2>${title}</h2`)
   
        $(this).find("#buttonsave").empty();
        $(this).find("#buttonsave").append(temp);
        $(this).find("#titlemodal").empty();
        $(this).find("#titlemodal").append(title);
    });



    // save movies to your profile

    $(document).on("click", "#save-button", function (event) {

        console.log("I clicked", event)
        var themoviedbid = $(this).data("id");
        var title = $(this).data("title");
        var pic = $(this).data("pic");
        var review = $("#review").val().trim();
        var rating = $("#rating").val().trim();
      
        console.log("themoviedbid", themoviedbid, " / ", title, " / ", pic, " / ", review, " / ", rating)

        // Send the POST request.
        $.ajax("/api/usermedia/" + themoviedbid + "/" + title + pic + "/"  + review + "/"  + rating, {
            type: "POST",
            data: true
        }).then(
            function () {
                // Reload the page to get the updated list
                location.reload();
            }
        );


    });

    // on click add to profile page

    $(".profile-page").on("click", function (event) {
        console.log("I clicked on profile page", event)

    });

    // ///// FRIENDS 

    // save friends to your profile

    $(document).on("click", ".addfriend", function (event) {

        console.log("I clicked add friend", event)
        var friendid = $(this).data("id");
        
        console.log("themoviedbid", friendid)

        // Send the POST request.
        $.ajax("/api/addfriend/" + friendid, {
            type: "POST",
            data: true
        }).then(
            function () {
                // Reload the page to get the updated list
                location.reload();
            }
        );


    });
    // $(document).on("click", "#invitefriend", function (event) {

    //     console.log("I clicked invite friend", event)
    //     var friendPhone =  $("#invitefriend").val().trim();
    //     var invitation = "first test"
    //     console.log("friendPhone", friendPhone)

    //     // Send the POST request.
    //         client.messages.create({
    //             to: friendPhone,
    //             from: '+141558284287',
    //             body: invitation
    //         }).then(
    //         function (response) {
    //             // Reload the page to get the updated list
    //             console.log(response)
    //         }
    //         );

    // });

  

});