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

let gekozenPenNib = {} // Sla hierin de database pen nib info op van gekozen pen nib uit formulier

// ----------------------
// TESTING / TIJDELIJK (opschonen bij issue resolve)
// ----------------------

async function verwerkFormulierInformatie() {
  // Sla formulier informatie op in variabelen
  berekeningObject.tekst = formulierInformatieObject.formulierTekst;  

    // Zet strings om naar numbers
  berekeningObject.letterafstand = Number(formulierInformatieObject.formulierLetterafstand);
  berekeningObject.woordafstand = Number(formulierInformatieObject.formulierWoordafstand);

  // Haal pen nib informatie op uit pen_nibs.json
  for(var penNib in penNibDatabase) {
    if (penNibDatabase[penNib].id === formulierInformatieObject.formulierPenNibID) {
      gekozenPenNib = penNibDatabase[penNib]
    }
  }
  berekeningObject.penNib = gekozenPenNib;

  // console.log(berekeningObject)

  // Maak de karakter map met ingevulde gegevens
    // Gebruik pen nib stroke breedte + karakterbreedte om karaktergrootte te bepalen
  maakKarakterMap(gekozenPenNib.strokeBreedte, berekeningObject.letterafstand)

  // Bereken de outputs

  
}

// KARAKTER MAP MAKEN

function maakKarakterMap(penNibStrokeBreedte, letterafstand) {
  for (let property in karakterDatabase) {
    // Sla breedte van karakters op in tijdelijke variabelen
    let karakterBreedte = `${karakterDatabase[property].breedte}`;
    let karakterArray = `${karakterDatabase[property].karakters}`;
    // console.log(karakterBreedte)
    // console.log(karakterArray)
    // console.log(penNibStrokeBreedte)

    for (let i = 0; i < karakterArray.length; i++) {
      // Vermenigvuldig karakterbreedte met penNibBreedte
      let berekendeKarakterBreedte = karakterBreedte * penNibStrokeBreedte

      // Check of berekendeKarakterBreedte eindigt op .0 of .5
      if ((berekendeKarakterBreedte * 10) % 1 !== 0) {
        // Voeg 0.25 toe aan berekendeKarakterBreedte als niet .5 of .0
        berekendeKarakterBreedte += 0.25;
      };

      // Sla ieder karakter met berekende breedte op in Map
      karakterMap.set(karakterArray[i], berekendeKarakterBreedte)
    }

    // Voeg spatie karakterbreedte toe aan Map
    karakterMap.set(" ", letterafstand)
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

  // Voor testen ophaalfunctie uitgezet
  // formulierInformatieObject = req.body;  
  // console.log("Ingevoerde gegevens voor berekening zin zijn:")
  // console.log(formulierInformatieObject);

  await verwerkFormulierInformatie();
  // Stuur outputs door naar webpagina
  res.send({berekening: berekeningObject})
  console.log("Informatie verstuurd naar webpagina")
  console.log(berekeningObject)
});
