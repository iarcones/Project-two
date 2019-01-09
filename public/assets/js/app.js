

$(document).ready(function () {
    // should this be above or outside of document.ready
    $('.carousel').carousel() 

    $.get("/movies")

        .then(function (data) {
            console.log(data)

            for (var i=0; i<data.length; i++){
                var movieDiv = (`<div id="carouselExample" class=“carousel-item active”>
                <img class=“d-block w-50 active” data-target="#carouselExample" src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}"  alt=“slide”>
                <p>${data[i].title}</p>
                </div>`)
                $("#movie-display").append(movieDiv);
            }
            
            
        })
})
{/* 
// drop everythig into movie-display
// <div class="carousel-item active">
//       <img class="d-block w-100" src="..." alt="First slide">
//     </div> */}