// Import MySQL connection.
var connection = require("../config/connection.js");

var orm = {

  // ORM method that selects all entries from a table 
  selectAll: function (table, cb) {
    var queryString = 'SELECT * FROM ' + table + ';'
    connection.query(queryString, function (err, response) {
      if (err) throw err;

      cb(response);
    })

  },

  // ORM method that inserts one new row into a table given a column and a value for the column
  insertOne: function (table, col, val, cb) {
    var queryString = 'INSERT INTO ' + table + '(' + col + ') VALUES ("' + val + '");'
    connection.query(queryString, function (err, response) {
      if (err) throw err;

      cb(response);
    })
  },

  // ORM method that updates one row in a table given a value to set
  updateOne: function (table, col, val, id, cb) {
    var queryString = 'UPDATE ' + table + ' SET ' + col + ' = ' + val + ' WHERE id=' + id + ';'
    connection.query(queryString, function (err, response) {
      if (err) throw err;

      cb(response);
    })
  }
}

// Export the orm object for the model (burger.js).
module.exports = orm;
