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

// const karakterMap = new Map();

  // DATABASE VERBINDINGEN

const penNibDatabase = require(__dirname + "/database/pen_nibs.json")
const karakterDatabase = require(__dirname + "/database/karakters.json")

// FUNCTIE MODULES

const karakterMapModule = require(__dirname + "/eigen_modules/karakter_map_maken.js")
const maakKarakterMap = karakterMapModule.maakKarakterMap
const karakterMap = karakterMapModule.karakterMap

// OPSLAG VARIABELEN

let formulierInformatieObject = {
  // ingevulde gegevens zijn om te testen
  formulierTekst: 'test string',
  formulierLetterafstand: '2',
  formulierWoordafstand: '9',
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
      berekeningObject.penNib = penNibDatabase[penNib]
    }
  }

  // Maak de karakter map met ingevulde gegevens
    // Gebruik pen nib stroke breedte + karakterbreedte om karaktergrootte te bepalen
  maakKarakterMap(berekeningObject.penNib.strokeBreedte, berekeningObject.woordafstand)

  let tekstlengte = 0;
  let karaktersInZinArray = [];
  let karakterLengteArray  = [];
  let karakterStartCoordinatenArray = [];

  // Bereken de outputs voor de ingevulde tekst
  for (let i = 0; i < berekeningObject.tekst.length; i++) {

    // Tijdelijke opslag lengte van karakter op plaats i
    let lengteVanKarakter = karakterMap.get(berekeningObject.tekst.charAt(i));

    // Vul startcoordinaten in bij output tabel arrays
    karakterStartCoordinatenArray.push(tekstlengte)
    // Voeg lengte van karakter toe aan tekstlengte
    tekstlengte += lengteVanKarakter
    
    // Voeg ruimte tussen karakters toe aan tekstlengte tot laatste karakter
    if ((i+1) < berekeningObject.tekst.length) {
      tekstlengte += berekeningObject.letterafstand
    }

    // Vul karakter en karakterlengte in bij output tabel arrays
    karaktersInZinArray.push(berekeningObject.tekst[i])
    karakterLengteArray.push(lengteVanKarakter)
    
    console.log(berekeningObject.tekst[i] +" = "+ lengteVanKarakter +" > totale lengte = "+ tekstlengte)

  }
  berekeningObject.tekstlengte = tekstlengte
  berekeningObject.karakterArray = karaktersInZinArray
  berekeningObject.karakterLengteArray = karakterLengteArray
  berekeningObject.karakterStartCoordinatenArray = karakterStartCoordinatenArray
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
