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
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

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

  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function(table, colVal, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(colVal);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  // // ORM method that updates one row in a table given a value to set
  // updateOne: function (table, colVal, id, cb) {
  //   var queryString = 'UPDATE ' + table + ' SET ' + colVal + ' WHERE ' + id + ';'
  //   connection.query(queryString, function (err, response) {
  //     console.log(queryString);
  //     if (err) throw err;

  //     cb(response);
  //   })
  // }
}

// Export the orm object for the model (burger.js).
module.exports = orm;
