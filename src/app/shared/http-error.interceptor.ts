import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {inject} from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
const _snackBar = inject(MatSnackBar)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Si è verificato un errore';
      let checkJSONServer = false

      if (error.error instanceof ErrorEvent) {
        errorMessage = `${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = 'Richiesta non valida';
            break;
          case 401:
            errorMessage = 'Non autorizzato';
            break;
          case 403:
            errorMessage = 'Accesso negato';
            break;
          case 404:
            errorMessage = 'Risorsa non trovata';
            break;
          case 500:
            errorMessage = 'Errore interno del server';
            break;
          default: {
            errorMessage = `Errore ${error.status}: ${error.message}`;
            checkJSONServer = true
          }
        }
      }
      _snackBar.open(errorMessage, checkJSONServer ? 'Check if json server is running' : '', {
        horizontalPosition: 'right',
        verticalPosition: 'top',

      });
      return throwError(() => error);
    }))

};
