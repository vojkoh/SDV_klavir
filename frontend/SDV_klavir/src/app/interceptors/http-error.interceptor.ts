import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Injectable()
export class AlertInterceptor implements HttpInterceptor {
  constructor(private readonly alertService: AlertService) {}
  protected showAlert(message: string) {
    this.alertService.setAlert(message);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let message = error.message;
        if (!navigator.onLine) {
          message = "Videti je, da nimate povezave z internetom!";
        } else if (error.status === 0) {
          message = "Zaledni sistem ni na voljo. Poskusite kasneje"
        }
        
        this.showAlert(message);
        return throwError(() => error);
      })
    );
  }
}
