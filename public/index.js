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

function toonResultaatBerekening(berekening) {
  console.log("Berekening object")
  console.log(berekening)
  let berekeningObject = berekening;
  for (let property in berekeningObject) {
    $("#berekeningenLijst").append("<p>"+`${property}: ${berekeningObject[property]}`+"</p>")
  }
}