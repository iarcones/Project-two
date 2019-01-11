$(document).ready(function () {
    // should this be above or outside of document.ready
    $('.carousel').carousel()

    $.get("/movies")

        .then(function (data) {
            console.log(data)
            var  active = (`<div class="carousel-item row no-gutters active">`);
            var noactive = (`<div class="carousel-item row no-gutters">`);

            var movieDiv = active;
            console.log("1", data.length)
            for (var i = 0; i < data.length; i++){
                console.log("2", i)
                var j = 0;
                for (j = 0; j < 4 && i < data.length; j++){
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
           
            var  active = (`<div class="carousel-item row no-gutters active">`);
            var noactive = (`<div class="carousel-item row no-gutters">`);

            var tvDiv = active;
            console.log("1", data.length)
            for (var i = 0; i < data.length; i++){
                console.log("2", i)
                var j = 0;
                for (j = 0; j < 4 && i < data.length; j++){
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

        })      