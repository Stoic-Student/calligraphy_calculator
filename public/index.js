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
    .then(data => {
      console.log(data);
      toonResultaatBerekening(data.data)
    })
    .catch(err => console.log(err));
})

function toonResultaatBerekening(resultaat) {
  console.log(resultaat)
  let resultaatObject = resultaat;
  for (let property in resultaatObject) {
    $("#berekeningenLijst").append("<p>"+`${property}: ${resultaatObject[property]}`+"</p>")
  }
}