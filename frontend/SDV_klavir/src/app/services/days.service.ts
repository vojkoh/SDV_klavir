import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Day } from '../classes/day';

@Injectable({
  providedIn: 'root'
})
export class DaysService {

  constructor(protected readonly http: HttpClient) {}

  protected readonly apiUrl = environment.apiUrl; 

  public getDay(day: number) {
    console.log(`Querying: ${this.apiUrl}/days/${day}`);
    return this.http.get<Day>(`${this.apiUrl}/days/${day}`);
  }
}
