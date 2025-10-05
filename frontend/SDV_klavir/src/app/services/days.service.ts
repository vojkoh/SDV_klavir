import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Day } from '../classes/day';
import { Timeslot } from '../classes/timeslot';
import { ReservationType } from '../classes/reservation-type';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(protected readonly http: HttpClient) {}

  protected readonly apiUrl = environment.apiUrl; 

  public getDay(day: number) {
    return this.http.get<Day>(`${this.apiUrl}/days/${day}`).pipe(catchError(this.handleError));
  }

  public reserveTimeslots(day: number, timeslot: number, reservationType: ReservationType, reservedBy: string): Observable<Day> {

    const result: Observable<Day> = this.http.post<Day>(
      `${this.apiUrl}/reserve/${day}/${timeslot}`, 
      { reservedBy: reservedBy, reservationType: reservationType }
    ).pipe(catchError(this.handleError));
    return result;
  }

  public unreserveTimeslots(day: number, timeslot: number): Observable<Day> {
    return this.http.post<Day>(`${this.apiUrl}/unreserve/${day}/${timeslot}`, {}).pipe(catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse) {
    console.error(`${error.status}, ${error.message}`);
    return throwError(() => error);
  }
}
