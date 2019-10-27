// Render buttons function on page load
$(document).ready(function () {
    // Create variable holding array of initial search terms
    var sitcoms = [
        "The IT Crowd", "The Office", "Seinfeld", "Frasier", "Everybody Loves Raymond", "The Middle",
        "New Girl", "The Simpsons", "Bob's Burgers"
    ];

    // Function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();
        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }
    // Create function to call gifs
    // Empty current container of gifs
    $(document).on("click", ".sitcom-button", function () {
        $("#sitcoms").empty();
        $(".sitcom-button").removeClass("active");
        $(this).addClass("active");
        // Create variable that grabs $(this).attr('data-name')
        var type = $(this).attr("data-type");
        // Create variable for query url
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=1hdfqbCgYYcCQ61lluq8Hi9gwoTbQofJ&limit=10";
        // Make ajax call
        // URL
        // GET method
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // .then(function(response))
            .then(function (response) {
                // Create variable to hold results
                var results = response.data;
                // Create for loop for response.data.length
                for (var i = 0; i < results.length; i++) {
                    // Use jQuery to create div to hold gif
                    var sitcomDiv = $("<div class=\"sitcom-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                    // create variable with attributes holding:
                    var sitcomImage = $("<img>");
                    // Create variable with attributes holding src:
                    sitcomImage.attr("src", still);
                    // Variable with attributes holding datastate for data-still
                    sitcomImage.attr("data-still", still);
                    // Variable with attributes holding datastate for data-animated
                    sitcomImage.attr("data-animate", animated);
                    sitcomImage.attr("data-state", "still");
                    sitcomImage.addClass("sitcom-image");
                    // append/prepend to page
                    sitcomDiv.append(p);
                    sitcomDiv.append(sitcomImage);

                    $("#sitcoms").append(sitcomDiv);
                }
            });
    });

    $(document).on("click", ".sitcom-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    // Function for submit button - add sitcom
    $("#add-sitcom").on("click", function (event) {
        event.preventDefault();
        // Set variable for search term using .val()
        var newSitcom = $("input").eq(0).val();

        if (newSitcom.length > 2) {
            // push variable to array
            sitcoms.push(newSitcom);
        }
        // Run render buttons function
        populateButtons(sitcoms, "sitcom-button", "#sitcom-buttons");

    });

    populateButtons(sitcoms, "sitcom-button", "#sitcom-buttons");
});
