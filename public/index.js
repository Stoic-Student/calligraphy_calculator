

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
      berekeningObject = resJSON.berekening
      console.log("Berekening object")
      console.log(berekeningObject);
      toonResultaatBerekening(berekeningObject)
    })
    .then(() => vulBerekeningInfoIn(berekeningObject))
    .catch(err => console.log(err));
})

let berekeningObject = {}

let berekeningNummer = 0;

async function toonResultaatBerekening(berekening) {
  berekeningNummer++;
  await stelHTMLSamenVoorBerekeningOutput()
  vulBerekeningInfoIn(berekening)
}

function stelHTMLSamenVoorBerekeningOutput() {
  $("#berekeningenLijst").prepend("<div id='"+berekeningNummer+"'></div>")
  // Laadt de complete HMTL code uit de test_file.html
  $("#"+berekeningNummer).load("output_display.html")
  $("#testKnop").on("click", function () {
    vulBerekeningInfoIn(berekeningObject)
  });
}

function vulBerekeningInfoIn(berekening) {
  $("#"+berekeningNummer).find(".berekeningNummer").text(berekeningNummer)
  $("#"+berekeningNummer).find(".berekeningTekst").text(berekening.tekst)
  $("#"+berekeningNummer).find(".berekeningPenNib").text(berekening.penNib.naam)
  $("#"+berekeningNummer).find(".berekeningLetterafstand").text(berekening.letterafstand)
  $("#"+berekeningNummer).find(".berekeningWoordafstand").text(berekening.woordafstand)
  $("#"+berekeningNummer).find(".berekeningZinlengte").html(berekening.tekstlengte+' | '+(berekening.tekstlengte / 2))

  // Stel Tabel HTML op in variabele
  let tabelHTML = "";
  for (let index = 0; index < berekening.karakterArray.length; index++) {
    tabelHTML += "<tr><td>"+berekening.karakterArray[index]+"</td><td>"+berekening.karakterLengteArray[index]+"</td><td>"+berekening.karakterStartCoordinatenArray[index]+"</td></tr>"
  }
  // Vervang tabel inhoud door tabel HTML
  $("#"+berekeningNummer).find(".karaktertabelOutput").html(tabelHTML)
}