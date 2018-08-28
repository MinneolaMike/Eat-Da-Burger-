// Function to house both the on click functions -- Waits for the DOM to be loaded
$(function () {
  // On CLick function of the buttons next to the burger names
  $(".changeDevoured").on("click", function (event) {
    // Variables needed
    var id = $(this).data("id");
    var devouredstate = $(this).data("devouredstate");
    var newDevouredState = {
      devoured: devouredstate
    };
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  // On Click function that creates a burger
  $("#makeBurger").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    // Variable for the newBurger
    var newBurger = {
      name: $("#newBurgerName").val().trim(),
      devoured: false
    };
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created New Burger");
        // Reload the page to get the updated list
        location.reload();
      }
    )
  })
});