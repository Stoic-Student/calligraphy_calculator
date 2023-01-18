// DATABASE VERBINDINGEN

const karakterDatabase = require(__dirname + "/../database/karakters.json")

// CONSTANTEN
const karakterMap = new Map();

// FUNCTIES

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

module.exports = {
  maakKarakterMap: maakKarakterMap,
  karakterMap: karakterMap
}