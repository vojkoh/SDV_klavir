import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alert$ = new Subject<string>();

  setAlert(alert: string): void {
    this.alert$.next(alert);
  }

  getAlert(): Observable<string> {
    return this.alert$.asObservable();
  }
}
