// Dit is de server main file

// ----------------------
// SERVER SETUP
// ----------------------

// Express requirements; hosted on localhost:3000
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
const $ = require("jquery");

// MySQL Database requirements
const mysql = require("mysql");
const config = require(__dirname + "/config.js");
const connection = mysql.createConnection(config);
const sqlConnect = require(__dirname + "/sql-connect.js");

// Body Parser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// VIEWS EN EJS SETUP

// Locatie browser page templates
app.set("views", path.join(__dirname, "views"));

// View engine set to EJS
app.set("view engine", "ejs");

// Notification that server is active
app.listen(port, () => {
  console.log("Calligraphy calculator local server listening on port " + port)
});

// Maak verbinding met SQL database
sqlConnect();

// ----------------------
// ROUTES EN FUNCTIES
// ----------------------

// HOME ROUTE

// Laad de home route
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
  console.log(req.body);
});
