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

- [ ] Maak object met output waarden
- [ ] Geef array met zulke objecten door aan index.ejs
- [/] Laat EJS dit object tonen met een re-render opdracht
  ^^^ dit kan niet met EJS. Gebruik jQuery met event handlers ;-)
  ^^^ jQuery werkt niet hetzelfde vanaf een server (niet 1 op 1 zoals vanuit javascript)

- Verwerk outputs in een object met een object generator(?)

## Vul invulformulier in met gegevens uit de database

- ik denk eraan om de database niet te gebruiken.
  - Het is mogelijk onnodig ingewikkeld voor deze tool.
  - JSON files werken waarschijnlijk ook voor dezelfde functionaliteit en zijn over te dragen met GitHub

-----------

# Ideëen



------

# Geleerd
