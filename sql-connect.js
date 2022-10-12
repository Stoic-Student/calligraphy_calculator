const mysql = require("mysql");
const config = require(__dirname + "/config.js");

const connection = mysql.createConnection(config);

function sqlConnect() {
  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server (from sql-connect.js)');
  });
};

module.exports = sqlConnect;
