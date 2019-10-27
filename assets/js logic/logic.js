$(document).ready(function () {

    var sitcoms = [
        "The IT Crowd", "The Office", "Seinfeld", "Frasier", "Everybody Loves Raymond", "The Middle",
        "New Girl", "The Simpsons", "Bob's Burgers"
    ];

    // function to make buttons and add to page
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

    $(document).on("click", ".sitcom-button", function () {
        $("#sitcoms").empty();
        $(".sitcom-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=1hdfqbCgYYcCQ61lluq8Hi9gwoTbQofJ&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var sitcomDiv = $("<div class=\"sitcom-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var sitcomImage = $("<img>");
                    sitcomImage.attr("src", still);
                    sitcomImage.attr("data-still", still);
                    sitcomImage.attr("data-animate", animated);
                    sitcomImage.attr("data-state", "still");
                    sitcomImage.addClass("sitcom-image");

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

    $("#add-sitcom").on("click", function (event) {
        event.preventDefault();
        var newSitcom = $("input").eq(0).val();

        if (newSitcom.length > 2) {
            sitcoms.push(newSitcom);
        }

        populateButtons(sitcoms, "sitcom-button", "#sitcom-buttons");

    });

    populateButtons(sitcoms, "sitcom-button", "#sitcom-buttons");
});
