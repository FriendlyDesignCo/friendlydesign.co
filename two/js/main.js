// Expands our navigation.
$("#click").click(function () {
    // Hides first button set so we have a new anchor to hide div.
    $('.buttons').hide();
    $('.hide').show();
    // Where animation begins by setting margins.
    $('#navigation').animate({
        marginLeft: "-10px",
    }, 1000, function () {
        // Animation complete.
    });
});

// Collapses our navigation.
$("#click2").click(function () {
    // Hides second button set so we have a new anchor to expand div.
    $('.hide').hide();
    $('.buttons').show();
    $('#navigation').animate({
        marginLeft: "-180px",
    }, 1000, function () {
        // Animation complete.
    });
});