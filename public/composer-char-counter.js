console.log("Tweet your message");

$(document).ready(function() {
    // --- our code goes here ---
    console.log("this");
  $("#tweet-text").on("input", function () {
    const counter = 140 - $(this).val().length;
    const counterElement = $(this).next().children(".counter");
    counterElement.text(counter);

    

    if (counter < 0 ) {
        $(".counter").addClass("redcounter");
    } else{
        $(".counter").removeClass("redcounter")
    }

  })
});
