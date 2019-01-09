

$(document).ready(function () {
    // should this be above or outside of document.ready
    $('.carousel').carousel()

    $.get("/movies")

        .then(function (data) {
            // console.log(data)
            var movieDiv = (`<div class="carousel-item row no-gutters active"><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[0].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[1].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[2].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[3].poster_path}"></div></div>`)

            // var movieDiv = (`<div class="carousel-item active">
            // <img class="d-block" data-target="#carouselExample" src="https://image.tmdb.org/t/p/w300/${data[0].poster_path}"  alt="slide">
            // <p>${data[0].title}</p>
            // </div>`)
            $("#movie-display").append(movieDiv);

            var movieDiv = (`<div class="carousel-item row no-gutters"><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[4].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[5].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[6].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[7].poster_path}"></div></div>`)

            // var movieDiv = (`<div class="carousel-item active">
            // <img class="d-block" data-target="#carouselExample" src="https://image.tmdb.org/t/p/w300/${data[0].poster_path}"  alt="slide">
            // <p>${data[0].title}</p>
            // </div>`)
            $("#movie-display").append(movieDiv);

            // for (var i = 4; i < data.length; i++) {
            //     var movieDiv = (`<div class="carousel-item row no-gutters"><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i+1].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i+2].poster_path}"></div><div class="col-3 float-left"><img class="img-fluid" src="https://image.tmdb.org/t/p/w300/${data[i+3].poster_path}"></div></div>`)
            //     $("#movie-display").append(movieDiv);
            //     i += 3;
            // }


        })
})
{/* 
// drop everythig into movie-display
// <div class="carousel-item active">
//       <img class="d-block w-100" src="..." alt="First slide">
//     </div> */}


{/* <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img class="d-block w-100" src="..." alt="First slide">
</div>
            <div class="carousel-item">
                <img class="d-block w-100" src="..." alt="Second slide">
</div>
                <div class="carousel-item">
                    <img class="d-block w-100" src="..." alt="Third slide">
</div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>  */}

            