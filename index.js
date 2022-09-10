// Berekeingen die de calculator uitvoert + gegevens die daarvoor nodig zijn.
// Staat in directe verbinding met de HTML pagina (op dit moment)

// ====================================================
// CONSTANTEN EN STARTVARIABELEN
// ====================================================

// ----------------------------------------------------
// KARAKTERS
// ----------------------------------------------------

// Array met karakters op basis van breedte
// Getal na array naam = aantal strokes per character
const karakter1 = ["i", "j", "1", "!", ".", ","]
const karakter2_5 = ["f", "l", "t", "I"]
const karakter3_5 = ["a", "b", "c", "d", "e", "g", "h", "k", "n", "o", "p", "q", "r", "s", "u", "v", "x", "y", "z", "0", "2", "3", "4", "5", "6", "7", "8", "9", "?", "-"]
const karakter4_5 = ["U", "V", "W"]
const karakter5 = ["&", "J"]
const karakter5_5 = ["N", "X"]
const karakter6 = ["m", "w", "B", "D", "E", "F", "H", "K", "L", "P", "R"]
const karakter7 = ["A", "S", "W", "C", "T"]
const karakter7_5 = ["M", "W"]
const karakter8 = ["G", "O", "Q"]

// Array met alle karakter arrays
const karakters = [karakter1, karakter2_5, karakter3_5, karakter4_5, karakter5, karakter5_5, karakter6, karakter7, karakter7_5, karakter8]

// Stroke breedte van karakters per array
const karakterBreedte = [1, 2.5, 3, 3.5, 4.5, 5, 5.5, 6, 7, 7.5, 8]

// Map met karakters per stroke breedte
const karakterMap = new Map();

// Voor iedere karakter array
// Kies karakterserie en bijbehorende breedte en sla op
for (var e = 0; e < karakters.length; e++) {
  let karakterArray = karakters[e];
  let breedteArray = karakterBreedte[e];
  // Voeg alle karakters uit array toe aan karakter map met bijbehorende stroke breedte.
  for (var i = 0; i < karakterArray.length; i++) {
    karakterMap.set(karakterArray[i], breedteArray);
  }
}

// ----------------------------------------------------
// PEN NIBS
// ----------------------------------------------------

// Map met pen nib multiplier per nib
const penNibMap = new Map();

// Deze waarden staan als penNib multiplier ingesteld
penNibMap.set("speedballC0", 3.5);
penNibMap.set("speedballC1", 2.5);
penNibMap.set("speedballC2", 2);
penNibMap.set("speedballC3", 1.5);
penNibMap.set("speedballC4", 1);
penNibMap.set("speedballC5", 0.5);

// Standaard geselecteerde pen nib (C-2)
let penNib = penNibMap.get("speedballC2")

// ----------------------------------------------------
// LETTER EN WOORD AFSTAND
// ----------------------------------------------------

// Ruimte in strokes tussen karakters (ook spaties) in mm (default 2.5 van C2 nib)
let letterafstand = 0

let woordafstand = 0

let penNibKeuze = ""

// Tekst van zin
let zin = ""

// Lengte van zin
let zinLengte = 0

// Uitgeschreven berekening
let zinBerekening = ""

// Startcoordinaten van karakters
let startCoordinaten = ""

// ----------------------------------------------------
// OVERIGE VARIABELEN
// ----------------------------------------------------

// Telt aantal uitgevoerde berekeningen
let berekeningNummer = 0

// Te printen HTML voor berekening output
let berekeningPrint = ""

// ====================================================
// BEREKENINGEN
// ====================================================

// ----------------------------------------------------
// ZINSLENGTE BEREKENING VAN INGEVOERDE TEKST
// ----------------------------------------------------

function resetInvoer() {
  // Reset zinlengte en berekening
  zinLengte = 0;
  zinBerekening = "";
  berekeningPrint = "";
  startCoordinaten = "";
  letterafstand = 0;
  woordafstand = 0;
};

// ----------------------------------------------------
// VARIABELEN OPSLAAN UIT FORMULIER

function opslaanInvoer() {
  // Sla ingevulde waarden uit formulier op
  zin = $("#formZin").val();
  letterafstand = $("#formLetterafstand").val();
  letterafstand = parseFloat(letterafstand);
  woordafstand = $("#formWoordafstand").val();
  woordafstand = parseFloat(woordafstand);
  penNibKeuze = $("#formPenNibSelectie").val();
};

// ----------------------------------------------------
// BEREKEN ZINSLENGTE

function berekenZinslengte() {
  // Zoek penNibKeuze op in penNibMap en haal bijbehorende multiplier op
  penNib = penNibMap.get(penNibKeuze);

  // Check of karakter uit zin voorkomt in karakterMap
  // Ja:
    // Zoekt ieder karakter uit de zin op in de karakterMap
    // Neemt de stroke breedte van het karakter
    // Telt dit op bij zinLengte
    // Voegt dit toe aan uitgeschreven berekening
  // Nee:
    // Alert met welk karakter niet voorkomt in map

// Test berekening afronden karakterbreedtes naar .5 of .0
for (i = 0; i < zin.length; i++) {
  if (karakterMap.has(zin.charAt(i))) {
    // Bereken breedte character bij gekozen pen nib
    let charBreedte = karakterMap.get(zin.charAt(i)) * penNib;
    // Controleer of characterbreedte afgerond moet worden
    if ((charBreedte * 10) % 1 !== 0) {
      // Voeg 0.25 toe aan charbreedte als niet .5 of .0
      charBreedte += 0.25;
    };

    // Voeg 0 toe als eerste startcoordinaat
    if (zinLengte === 0) {
      startCoordinaten += "0 · "
    } else {
      // Voeg charBreedte + totale letterafstand toe aan startcoordinaten
      startCoordinaten += (zinLengte + (letterafstand*i))+" · "
    };

    zinLengte += charBreedte;
    zinBerekening += (charBreedte + " · ");

  } else if (zin.charAt(i) === " ") {
    // Bij spatie karakters
    startCoordinaten += (zinLengte + (letterafstand*i))+" # ";
    zinLengte += woordafstand;
    zinBerekening += (woordafstand + " # ");

  } else {
    alert("De zin bevat karakter: [" + zin.charAt(i) + "] . Daarvoor is geen lengte ingevoerd.")
  }
};

  // Voeg letter ruimte toe (# karakters -1) * letterAfstand
  zinLengte += letterafstand * (zin.length - 1);
};

// ----------------------------------------------------
// GENEREER HTML OUTPUT

function genereerHTMLOutput() {
  // Open tabel
  berekeningPrint += "<table>"

  // Rij met zin berekeningsnummer
  berekeningPrint += "<tr><td><strong>Berekening:</strong></td><td>"+berekeningNummer+"</td></tr>"
  // Rij met tekst van de zin
  berekeningPrint += "<tr><td>Tekst:</td><td>"+zin+"</td></tr>"
  // Pen nib keuze
  berekeningPrint += "<tr><td>Pen nib:</td><td>"+penNibKeuze+"</td></tr>"
  // letterafstand:
  berekeningPrint += "<tr><td>Letter / Woordafstand:</td><td>"+letterafstand+" | "+woordafstand+"</td></tr>"
  // Totale zinslengte + 1/2 zinlengte
  berekeningPrint += "<tr><td>Zinlengte | (1/2):</td><td>"+zinLengte+" | "+zinLengte*0.5+"</td></tr>"
  // Lengte per karakter zonder spaties
  berekeningPrint += "<tr><td>Lengte / karakter:</td><td>"+zinBerekening+"</td></tr>"
  // Karakter coordinaten
  berekeningPrint += "<tr><td>Startcoordinaten:</td><td>"+startCoordinaten+"</td></tr>"

  // Sluit tabel
  berekeningPrint += "</table><hr>"
};

// ----------------------------------------------------
// HTML OUTPUT

function printHTML() {
  // Zet de berekening in HTML op de pagina direct onder kopje Zin Berekeningen
  $("#berekeningenLijst").prepend(berekeningPrint);
}

function clearOutput() {
  $("#berekeningenLijst").empty();
}

// ====================================================
// KNOP INSTELLINGEN
// ====================================================

$("#knopZinBerekenen").on("click", function() {
  resetInvoer();
  berekeningNummer++;
  opslaanInvoer();
  berekenZinslengte();
  genereerHTMLOutput();
  printHTML();
});

$("#knopClearOutput").on("click", function() {
  clearOutput();
});
