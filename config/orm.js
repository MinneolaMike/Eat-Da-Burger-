// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations 
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // example {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }
  // Translate array of strings to a single comma-separated string
  return arr.toString();
}

// Start of the Orm functions
var orm = {

  // ORM method that selects all from the table 
  selectAll: function (table, cb) {
    var queryString = "SELECT * FROM " + table + ";"
    connection.query(queryString, function (err, response) {
      if (err) throw err;

      cb(response);
    })

  },

  // ORM method that inserts a new row into the table
  insertOne: function (table, col, val, cb) {
    var queryString = "INSERT INTO " + table + '(' + col + ') VALUES ("' + val + '");'
    connection.query(queryString, function (err, response) {
      if (err) throw err;

      cb(response);
    })
  },

  // ORM method that updates the Boolean devoured in the table
  updateOne: function (table, colVal, condition, cb) {
    var queryString = "UPDATE " + table + " SET " + objToSql(colVal) + " WHERE " + condition + ";"
    connection.query(queryString, function (err, response) {
      console.log(queryString);
      if (err) throw err;

      cb(response);
    })
  }
}

// Export the orm object for the model (burger.js).
module.exports = orm;
