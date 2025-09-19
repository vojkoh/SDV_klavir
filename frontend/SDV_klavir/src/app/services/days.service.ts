import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Day } from '../classes/day';
import { Timeslot } from '../classes/timeslot';
import { ReservationType } from '../classes/reservation-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(protected readonly http: HttpClient) {}

  protected readonly apiUrl = environment.apiUrl; 

  public getDay(day: number) {
    return this.http.get<Day>(`${this.apiUrl}/days/${day}`);
  }

  public reserveTimeslots(day: number, timeslot: number, reservationType: ReservationType, reservedBy: string): Observable<Day> {

    const result: Observable<Day> = this.http.post<Day>(
      `${this.apiUrl}/reserve/${day}/${timeslot}`, 
      { reservedBy: reservedBy, reservationType: reservationType }
    );
    return result;
  }

  public unreserveTimeslots(day: number, timeslot: number): Observable<Day> {

    const result: Observable<Day> = this.http.post<Day>(`${this.apiUrl}/unreserve/${day}/${timeslot}`, {});
    return result;
  }
}
