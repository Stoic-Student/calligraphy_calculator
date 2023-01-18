# To Do voor Calligraphy Tool

## Redesign input / output berekening zin (#34)

- [v] Input op HTML:
  - [v] Tekst als string
  - [v] Pen nib dropdown selectie
  - [v] Handmatige invoer letterafstand
  - [v] Handmatige invoer woordafstand
- [ ] Output in HTML:
  - [ ] Zinslengte | 1/2 zinslengte
  - [ ] Tabel met <!-- Kan een array van objecten zijn, ipv HTML. Dan met EJS uitwerken tot tabel -->
    - [ ] Karakters
    - [ ] Karakterlengtes
    - [ ] Startcoordinaten
  - [ ] MD tabel net als HTML tabel

- [v] Maak object met output waarden
- [v] Geef array met zulke objecten door aan index.ejs
- [/] Laat EJS dit object tonen met een re-render opdracht
  ^^^ dit kan niet met EJS. Gebruik jQuery met event handlers ;-)
  ^^^ jQuery werkt niet hetzelfde vanaf een server (niet 1 op 1 zoals vanuit javascript)

- [ ] Stel tabellen layout netjes in met CSS
- [ ] 

### Hoe voeg je nieuwe info van de server toe aan bestaande webpagina zonder te herladen?

- Met de form.post ontvangt de server de info uit het formulier
- Hoe kan de server deze dan verwerken en terugsturen?
  - Mogelijk iets met jQuery (wat nu werkt)

- [X] Bekijk [AJAX](https://www.w3schools.com/js/js_ajax_intro.asp)
- [X] Bekijk [Fetch API (W3Schools)](https://www.w3schools.com/js/js_api_fetch.asp)
- [X] [Fetch API (Hubspot)](https://blog.hubspot.com/website/javascript-fetch-api)
- [X] [Gebruik fetch met een formulier](https://www.youtube.com/watch?v=TTf0mMl0Sc4)

## Vul invulformulier in met gegevens uit de database

- ik denk eraan om de database niet te gebruiken.
  - Het is mogelijk onnodig ingewikkeld voor deze tool.
  - JSON files werken waarschijnlijk ook voor dezelfde functionaliteit en zijn over te dragen met GitHub

## Berekeningen updaten met betere flow

- De ingevulde gegevens kunnen worden gebruikt om de karakterlengte in te stellen in de karakter Map.
  - Dat zou de berekeningen daarna eenvoudiger moeten maken.

-----------

# Ideëen



------

# Geleerd
