# IneoApp

Piccolo progetto in Angular 19 con Angular Material per la gestione di un set di task.
Sviluppato su node 22.12.0 e npm 10.9.0


## Installazione
* npm install


## Start
*  npm run json-db - per avviare json server
*  ng serve - per avviare l'applicazione front-end 

## Note
* all'avvio vengono caricati i tasks e suddivisi nelle 3 sezioni in base al loro stato
* è possibile aggiungere un nuovo task con il pulsante +. Il nuovo task verrà inserito nella colonna TO DO
* cliccando su un task è possibile selezionarlo per la cancellazione
* l'icona di editing su ogni task permette la sua modifica
* è stato implementato l'ordinamento per nome o descrizione
* è stato aggiunto un httpInterceptor per la gestione degli errori centralizzata con notifica tramite snackbar

## Missing
* non è possibile modificare lo stato di un task - l'applicativo permette di aggiungere in un secondo momento un interazione con drag & drop per spostare i task da una sezione all'altra
* 
