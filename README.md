# Projekt iz kolegija Računarstvo usluga i analiza podataka

# Naziv projekta: Predviđanje dijabetesa

Cilj projekta bio je izraditi odabrati dobar skup podataka, odabrati dobre značajke, napraviti analizu podataka, napraviti i
deployati model pomoću Microsoft Azure platforme, te izraditi web stranicu koja će koristiti izrađeni model.

## Projekt obuhvaća:
* Analizu podataka korištenjem Diabetes Prediction Dataset-a
* Izrada i treniranje modela logističke regresije
* Implementaciju REST API-ja na Microsoft Azure platformi
* Web stranicu koja komunicira s API-jem i omugućuje korisniku unos podataka te prikaz rezultata predikcije
* Seminar koji dokumentira cjelokupni proces - od analize podataka, izrade modela, do razvoja i korištenja web stranice

## Analiza skupa podataka uključivala je:
* Čišćenje i pripremu podataka
* Istraživačku analizu podataka
* Odabir relevantnih značajki i modela za binarnu klasifikaciju
* Kaggle - https://www.kaggle.com/datasets/iammustafatz/diabetes-prediction-dataset
 
## Izrada modela za predikciju dijabetesa
* Azure AutoML korišten je za predodabir modela logističke regresije
* Azure Designer korišten je za izradu modela logističke regresije
* Azure Endpoint - Web servis
* Adresa krajnje točke - http://761e0046-f8d3-4485-af0d-7ff6f8b1f918.polandcentral.azurecontainer.io/score

## Web stranica
* Korišten HTML, CSS i JavaScript za frontend
* Korišten REST API za dohvat rezultata modela
* Omogućuje unos korisnikovih vrijednosti i prikaz predikcije (Postoji ili ne postoji rizik od dijabetesa)
* Prikaz dodatnih informacija o tipovima dijabetesa
* Prikaz podataka korištenih za izradu modela za predikciju dijabetesa

## Seminar
* Detaljna analiza podataka
* Opis infrastrukture (Azure, REST API, Web stranica)


## Autori
* Marinela Bekić
* Andrej Damašek
