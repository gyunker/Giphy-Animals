window.onload = function() {
    var movies = ["Dog", "Cat", "Bird", "Lion", "Snake", "Elephant", "Pig", "Sloth"];

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayMovieInfo() {
        $("#movies-view").empty();
        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WDMGB5P0OcsvQVPJHOL41CDenovmSfuz&q="+movie+"&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        // Creating a div to hold the movie
           
        for (var i = 0; i < 10; i++){
            var movieDiv = $("<div class='movie'>");
            var rating = response.data[i].rating;
            var pOne = $("<p>").text("Rating: " + rating);
            movieDiv.append(pOne);

            var imgURL = $("<img>");
                imgURL.attr({
                "src": response.data[i].images.fixed_height_still.url,
                "data-state": "still",
                "data-animate": response.data[i].images.fixed_height.url,
                "data-still": response.data[i].images.fixed_height_still.url
            });
            movieDiv.append(imgURL);
            $("#movies-view").append(movieDiv);

            imgURL.on("click", function() {
                // This checks the state - if the state is still, we change it to animate, else we change it to still - like a toggle   
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });  
            console.log(imgURL);

            
        };
        });
        };

    // Function for displaying movie data
    function renderButtons() {
        // Deleting the movies prior to adding new movies
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
            a.addClass("movie-btn");
            a.attr("data-name", movies[i]);
            a.text(movies[i]);
            $("#buttons-view").append(a);
            }
        };

    // This function handles events where a movie button is clicked
    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        movies.push(movie);
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".movie-btn", displayMovieInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
 
};