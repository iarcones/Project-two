$(document).ready(function () {
    // should this be above or outside of document.ready
    $('.carousel').carousel({
        interval: 0
    })

    $.get("/movies/")

        .then(function (data) {
            console.log(data)
            var active = (`<div class="carousel-item row no-gutters active">`);
            var noactive = (`<div class="carousel-item row no-gutters">`);

            var movieDiv = active;
            console.log("1", data.length)
            for (var i = 0; i < data.length; i++) {
                console.log("2", i)
                var j = 0;
                for (j = 0; j < 4 && i < data.length; j++) {
                    console.log("3", i, j)
                    var detail = (`<div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i].poster_path}"></div>`)
                    var movie = movieDiv.concat(detail)
                    var movieDiv = movie;
                    i++;
                }
                i--
                console.log(movieDiv)
                $("#movie-display").append(movieDiv);
                var movieDiv = noactive;
            }

        })


    $.get("/tv")

        .then(function (data) {
            
            var active = (`<div class="carousel-item row no-gutters active">`);
            var noactive = (`<div class="carousel-item row no-gutters">`);

            var tvDiv = active;
            console.log("1", data.length)
            for (var i = 0; i < data.length; i++) {
                console.log("2", i)
                var j = 0;
                for (j = 0; j < 4 && i < data.length; j++) {
                    console.log("3", i, j)
                    var detail = (`<div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i].poster_path}"></div>`)
                    var tv = tvDiv.concat(detail)
                    var tvDiv = tv;
                    i++;

                }
                i--
                console.log(tvDiv)
                $("#tv-display").append(tvDiv);
                var tvDiv = noactive;
            }

        })
// save movies to your profile
        $(".save-button").on("click", function(event) {
            console.log("I clicked", event)
            var themoviedbid = $(this).data("id");
            var title = $(this).data("title");
            var pic = $(this).data("pic");

            console.log("themoviedbid", themoviedbid, " / ", title, " / ", pic)

             // Send the PUT request.
             $.ajax("/api/usermedia/" + themoviedbid + "/" + title + pic, {
                type: "POST",
                data: true
            }).then(
                function () {
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        
    
        });
// delete movies to your profile
        $(".delete").on("click", function(event) {
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
            console.log(id, title, pic);
            $(this).find(".modal-title").text(id);
            $(this).find(".modal-title").append(title);
            $(this).find(".modal-title").append(pic);
          });
        // on click add to profile page
    

        $(".profile-page").on("click", function(event) {
            console.log("I clicked on profile page", event)
            
         
        });
    


});