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

// Stuff for JQuery
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("");
const $ = require("jquery")(dom.window);

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

// DATABASE VERBINDINGEN

const penNibDatabase = require(__dirname + "/database/pen_nibs.json")

// ----------------------
// TESTING / TIJDELIJK (opschonen bij issue resolve)
// ----------------------

// ----------------------
// ROUTES EN FUNCTIES
// ----------------------

// HOME ROUTE

// Laad de home route
app.get("/", function(req, res) {
  res.render("index", {
    penNibInfo: penNibDatabase
  });
});

app.post('/', function(req, res) {
  console.log("Ingevoerde gegevens voor berekening zin zijn:")
  console.log(req.body);
});
