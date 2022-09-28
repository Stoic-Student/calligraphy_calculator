# Calligraphy Calculator

Dit is een tool voor het maken van kalligrafie ontwerpen. Kalligrafie heeft vaste letterratio's. Bij het maken van complexe ontwerpen helpt het om snel te kunnen berekenen welke aanpassingen van de tekst en letters nodig zijn.

Deze tool neemt de tekst, letterafstand en woordafstand als input en berekent de lengte van de tekst.

## Server opstarten

Voorlopig werkt het nog met een localhost server en localhost database. Start deze met de command line vanaf "/":

Vanaf laptop:<br>
cd documents/github/calligraphy_calculator

Vanaf PC:<br>
cd d/dagmar/projects/calligraphy/'calligraphy calculator'

Server opstarten:<br>
nodemon app.js

## Onderdelen

- Nodemon (development tool)
- Node.js / Express (server)
  - Bodyparser (module)
  - jQuery (module)
- EJS (HTML templating)
- Bootstrap (CSS)
- ... (database)
