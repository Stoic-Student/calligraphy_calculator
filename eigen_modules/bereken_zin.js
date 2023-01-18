

// EXTERNE INFO



function outputInfoOpstellen(informatieInObject, mapMetKarakters) {
  let tekstlengte = 0;
  let karaktersInZinArray = [];
  let karakterLengteArray = [];
  let karakterStartCoordinatenArray = [];
  
  // Bereken de outputs voor de ingevulde tekst
  for (let i = 0; i < informatieInObject.tekst.length; i++) {
  
    // Tijdelijke opslag lengte van karakter op plaats i
    let lengteVanKarakter = mapMetKarakters.get(informatieInObject.tekst.charAt(i));
  
    // Vul startcoordinaten in bij output tabel arrays
    karakterStartCoordinatenArray.push(tekstlengte)
    // Voeg lengte van karakter toe aan tekstlengte
    tekstlengte += lengteVanKarakter
  
    // Voeg ruimte tussen karakters toe aan tekstlengte tot laatste karakter
    if ((i + 1) < informatieInObject.tekst.length) {
      tekstlengte += informatieInObject.letterafstand
    }
  
    // Vul karakter en karakterlengte in bij output tabel arrays
    karaktersInZinArray.push(informatieInObject.tekst[i])
    karakterLengteArray.push(lengteVanKarakter)
  
    // console.log(informatieInObject.tekst[i] +" = "+ lengteVanKarakter +" > totale lengte = "+ tekstlengte)

    informatieInObject.tekstlengte = tekstlengte
    informatieInObject.karakterArray = karaktersInZinArray
    informatieInObject.karakterLengteArray = karakterLengteArray
    informatieInObject.karakterStartCoordinatenArray = karakterStartCoordinatenArray
  }
}




module.exports = outputInfoOpstellen;