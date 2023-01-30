

const formulier = document.getElementById('formulierVoorZinBerekening');

formulier.addEventListener('submit', function (e) {
  e.preventDefault()
  // Create payload as new FormData object:
  const formData = new FormData(formulier);
  console.log(...formData)
  // Convert formData object to URL-encoded string:
  const payload = new URLSearchParams(formData);
  // Post the payload using Fetch:
  fetch('/', {
    method: 'POST',
    body: payload,
  })
    .then(res => res.json())
    .then(resJSON => {
      console.log("Ontvangen informatie van server")
      console.log(resJSON);
      toonResultaatBerekening(resJSON.berekening)
    })
    .catch(err => console.log(err));
})

let berekeningNummer = 0;

function toonResultaatBerekening(berekening) {
  berekeningNummer++;
  console.log("Berekening object")
  console.log(berekening)
  let berekeningObject = berekening; // Gebruik deze variabele als je met de database gaat werken

  stelHTMLSamenVoorBerekeningOutput(berekeningObject)
  // for (let property in testBerekeningObject) {
  //   $("#berekeningenLijst").append("<p>"+`${property}: ${testBerekeningObject[property]}`+"</p>")
  // }
  $("#testKnop").on("click", function () {
    vulBerekeningInfoIn(berekeningObject)
  });
}

function stelHTMLSamenVoorBerekeningOutput() {
  $("#berekeningenLijst").prepend("<div id='"+berekeningNummer+"'></div>")
  // Laadt de complete HMTL code uit de test_file.html
  $("#"+berekeningNummer).load("output_display.html")
}

function vulBerekeningInfoIn(berekening) {
  $("#berekeningTekst").text(berekening.tekst)
  $("#berekeningPenNib").text(berekening.penNib.naam)
  $("#berekeningLetterafstand").text(berekening.letterafstand)
  $("#berekeningWoordafstand").text(berekening.woordafstand)
  $("#berekeningZinlengte").html(berekening.tekstlengte+' | '+(berekening.tekstlengte / 2))
  for (let i = 0; i < berekening.karakterArray.length; i++) {
    $("#karaktertabelOutput").append("<tr><td>"+berekening.karakterArray[i]+"</td><td>"+berekening.karakterLengteArray[i]+"</td><td>"+berekening.karakterStartCoordinatenArray[i]+"</td></tr>")
  }
}