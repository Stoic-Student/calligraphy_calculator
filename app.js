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
  console.log("Kalligrafietool is live op local host server port " + port)
});

// CONSTANTEN

const karakterMap = new Map();

  // DATABASE VERBINDINGEN

const penNibDatabase = require(__dirname + "/database/pen_nibs.json")
const karakterDatabase = require(__dirname + "/database/karakters.json")

// OPSLAG VARIABELEN

let formulierInformatieObject = {
  // ingevulde gegevens zijn om te testen
  formulierTekst: 'test string',
  formulierLetterafstand: '9',
  formulierWoordafstand: '2',
  formulierPenNibID: 'speedball_c-3'
};

let berekeningObject = {} // Hierin komt de info die de server terugstuurt

// ----------------------
// TESTING / TIJDELIJK (opschonen bij issue resolve)
// ----------------------

async function verwerkFormulierInformatie() {
  // Sla formulier informatie op in variabelen
  berekeningObject = formulierInformatieObject;
    
  // Zet strings om naar numbers
  berekeningObject.letterafstand = parseFloat(berekeningObject.formulierLetterafstand);
  berekeningObject.woordafstand = parseFloat(berekeningObject.formulierWoordafstand);

  // Maak de karakter map met ingevulde gegevens

  // Bereken de outputs

  
}

// KARAKTER MAP MAKEN

function maakKarakterMap() {
  for (let property in karakterDatabase) {
    let karakterBreedte = `${karakterDatabase[property].breedte}`;
    let karakterArray = `${karakterDatabase[property].karakters}`;
    console.log(karakterBreedte)
    console.log(karakterArray)
    for (let i = 0; i < karakterArray.length; i++) {
      karakterMap.set(karakterArray[i], karakterBreedte)
    }
  }
  console.log(karakterMap)
}

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

app.post('/', async function(req, res) {
  // Sla informatie uit het formulier op
  formulierInformatieObject = req.body;  
  console.log("Ingevoerde gegevens voor berekening zin zijn:")
  console.log(formulierInformatieObject);

  await verwerkFormulierInformatie();
  // Stuur outputs door naar webpagina
  res.send({berekening: berekeningObject})
  console.log("Informatie verstuurd naar webpagina")
  console.log(berekeningObject)
});
