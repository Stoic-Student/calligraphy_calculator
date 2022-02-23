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
const karakter3 = [" "]
const karakter3_5 = ["a", "b", "c", "d", "e", "g", "h", "k", "n", "o", "p", "q", "r", "s", "u", "v", "0", "2", "3", "4", "5", "6", "7", "8", "9", "?", "-"]
const karakter4_5 = ["U", "V", "W"]
const karakter5 = ["&", "J"]
const karakter5_5 = ["N", "X"]
const karakter6 = ["m", "w", "B", "D", "E", "F", "H", "K", "L", "P", "R"]
const karakter7 = ["A", "S", "W", "C", "T"]
const karakter7_5 = ["M", "W"]
const karakter8 = ["G", "O", "Q"]

// Array met alle karakter arrays
const karakters = [karakter1, karakter2_5, karakter3, karakter3_5, karakter4_5, karakter5, karakter5_5, karakter6, karakter7, karakter7_5, karakter8]

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

// Standaard geselecteerde pen nib (C-2)
let penNib = penNibMap.get("speedballC2")

// ----------------------------------------------------
// LETTER EN WOORD AFSTAND
// ----------------------------------------------------

// Ruimte in strokes tussen karakters (ook spaties) in mm (default 2.5 van C2 nib)
let letterAfstand = 2.5

let zinLetterAfstand = 0

// Tekst van zin
let zin = ""

// Lengte van zin
let zinLengte = 0

// Uitgeschreven berekening
let zinBerekening = ""

// ====================================================
// BEREKENINGEN
// ====================================================

// ----------------------------------------------------
// ZINSLENGTE BEREKENING VAN INGEVOERDE TEKST
// ----------------------------------------------------

$("#knopZinBerekenen").on("click", function() {
  // ----------------------------------------------------
  // VARIABELEN OPSLAAN UIT FORMULIER

  // Reset zinlengte en berekening
  zinLengte = 0;
  zinBerekening = "";

  // Sla ingevulde waarden uit formulier op
  zin = $("#formZin").val();
  letterafstand = $("#formLetterafstand").val();
  let penNibKeuze = $("#formPenNibSelectie").val();

  // ----------------------------------------------------
  // BEREKEN ZINSLENGTE

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

  for (i=0; i<zin.length; i++) {
    if (karakterMap.has(zin.charAt(i))) {
      zinLengte += (karakterMap.get(zin.charAt(i))*penNib);
      zinBerekening += (karakterMap.get(zin.charAt(i))*penNib + " ");
    } else {
      alert("De zin bevat karakter: [" + zin.charAt(i) + "] . Daarvoor is geen lengte ingevoerd.")
    }
  };

  // Voeg letter ruimte toe (# karakters -1) * letterAfstand
  zinLengte += letterafstand * (zin.length - 1);

  // ----------------------------------------------------
  // HTML OUTPUT

  // Vul de zin eigenschappen en berekeningen in bij HTML output
  $("#zinTekst").text(zin);
  $("#zinPenNib").text(penNibKeuze);
  $("#zinLetterafstand").text(letterafstand);
  $("#zinLengte").text(zinLengte);
  $("#zinLengteHalf").text(zinLengte*0.5);
  $("#zinBerekening").text(zinBerekening);
});
