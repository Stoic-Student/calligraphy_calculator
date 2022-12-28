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

// DATABASE VERBINDINGEN

const penNibDatabase = require(__dirname + "/database/pen_nibs.json")

// ----------------------
// TESTING / TIJDELIJK (opschonen bij issue resolve)
// ----------------------



let zoekPenNibs = 'SELECT * FROM pen_nibs';

// Nog even niet nodig (tijdelijk disabled)

// connection.query(zoekPenNibs, (error, results, fields) => {
//     if (error) {
//       return console.error(error.message);
//     }
//     console.log("Pen nib zoekresultaten zijn:");
//     console.log(results);
//   });

// Sla hierin de output objecten op voor index.ejs
const outputArray = [];

// Deze output waarden worden gebruikt door index.ejs per berekening
let testOutput = {
  tekst: "test tekst", // Dit is gelijk aan de input tekst
  penNibId: "sb_c-2", // Dit is de pen nib ID gekozen bij de berekening
  letterAfstand: 2, // Dit is de letter afstand; als niet ingevuld, dan default uit database
  woordAfstand: 7, // Dit is de woord afstand; als niet ingevuld, dan default uit database
  zinslengte: 40, // Dit is de berekende zinslengte
  zinslengteHalf: 20, // Dit is de berekende zinslengte gedeeld door twee
  karakterTabel: "" // Nog besluiten hoe dit aangeleverd gaat worden
};

outputArray.push(testOutput);

// console.log("Informatie in outputArray:")
// console.log(outputArray);

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
