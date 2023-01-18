# jQuery toevoegen aan een pagina met een server

Zet dit in de app.js (server file) (om jQuery te laten werken op webpagina's geladen door de server)

```js
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("");
const $ = require("jquery")(dom.window);
```

jQuery werkt vanaf een public .js file.
Zet de file met jQuery code in de public folder (die de server ook kent), zoals normaal.

# HTML file laden met jQuery

```js
$("DOM element").load("test_file.html")
```
Dit plaatst de hele HTML file binnen het geselecteerde element.
Dit kan ook met ajax gecombineerd worden, maar ik weet niet goed hoe je dit toepast.

# Loop van object properties

Loop door een object eigenschappen zoals een forEach loop bij Arrays:

[MDN webdocs over "for...in"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

~~~js
const object = {prop1: "string", prop2: 20}
for(let property in object) {
    // Functie die voor iedere property in het object moet worden uitgevoerd
}
~~~

# Posts van formulieren naar server

De req.body van een formulier met method="post" gebruikt de <input name="[naam]"> om de informatie op te halen.
Alle <input> elementen hebben dus een name waarde nodig om geregistreerd te worden.

## Post formulier data met Fetch API

[Tutorial over formulieren en fetch API](https://openjavascript.info/2022/04/26/post-form-data-using-javascripts-fetch-api/)

Je kan de submit knop functie herschrijven, zodat het formulier naar de server gaat en de pagina niet wordt herladen, maar wel kan reageren op de informatie die daarna van de server komt.

Gebruik de URL encoded form data om de server een goede req.body te geven.
