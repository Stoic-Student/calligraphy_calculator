# jQuery toevoegen aan een pagina met een server

Zet dit in de app.js (server file) (om jQuery te laten werken op webpagina's geladen door de server)

```js
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("");
const $ = require("jquery")(dom.window);
```

jQuery werkt vanaf een public .js file.
Zet de file met jQuery code in de public folder (die de server ook kent), zoals normaal.

# Loop van object properties

Loop door een object eigenschappen zoals een forEach loop bij Arrays:

[MDN webdocs over "for...in"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

# Posts van formulieren naar server

De req.body van een formulier met method="post" gebruikt de <input name="[naam]"> om de informatie op te halen.
Alle <input> elementen hebben dus een name waarde nodig om geregistreerd te worden.



