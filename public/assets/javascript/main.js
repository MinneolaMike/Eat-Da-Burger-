// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $("#changeDevoured").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    var devouredState = $(this).data("devouredState");

    var newDevouredState = {
      devoured: devouredState
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

  $("#makeBurger").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

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