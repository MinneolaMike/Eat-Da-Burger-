// Requiring express
var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// GET route to get all items in the table
router.get("/", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// POST route which will be used to create a newBurger
router.post("/api/burgers", function (req, res) {
  burger.create(req.body.name, function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// PUT route which will update the boolean devoured
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update(
    {
      devoured : req.body.devoured
    },
    condition, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  })
});

// Export routes for server.js to use.
module.exports = router;