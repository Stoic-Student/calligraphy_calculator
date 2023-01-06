$("#testKnop").on("click", function () {
  console.log("jQuery werkt!");
  $("#berekeningenLijst").text("test zin")
});



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

  // Gebruik tijdelijke variabele om HTML output in te stellen
  const testBerekeningObject = {
    tekst: "test zin",
    pen_nib: "speedball C-2",
    letterafstand: 2.5,
    woordafstand: 7,
    zinlengteHeel: 56,
    zinlengteHalf: 28,
    lengtePerKarakter: [5,5,5,5,7,5,3,5],
    startcoordinaten: [0,7,14,21,30,37,42,49]
  }
  stelHTMLSamenVoorBerekeningOutput()
  // for (let property in testBerekeningObject) {
  //   $("#berekeningenLijst").append("<p>"+`${property}: ${testBerekeningObject[property]}`+"</p>")
  // }
}

function stelHTMLSamenVoorBerekeningOutput() {
  $("#berekeningenLijst").prepend("<div id='"+berekeningNummer+"'></div>")
  $("#"+berekeningNummer).load("test_file.html") // Laadt de complete HMTL code uit de test_file.html
}