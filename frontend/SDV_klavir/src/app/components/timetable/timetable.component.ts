import { Component } from '@angular/core';
import { TimeslotButtonComponent } from "../timeslot-button/timeslot-button.component";
import { CommonModule } from '@angular/common';
import { Timeslot } from '../../classes/timeslot';
import { ReservationType } from '../../classes/reservation-type';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [TimeslotButtonComponent, CommonModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent {
  timeslots : Timeslot[] = [
    {
      id: "ab2839402859385728493857",
      start: "9.00",
      reservationType: ReservationType.Permanent,
      reservedBy: "John Doe",
      createdAt: "2021-01-01T00:00:00",
      updatedAt: "2021-01-01T00:00:00"
    },
    {
      id: "ab2839402859385728453857",
      start: "9.30",
      reservationType: ReservationType.Permanent,
      reservedBy: "Jane Doe",
      createdAt: "2021-01-01T00:00:00",
      updatedAt: "2021-01-01T00:00:00"
    },
    {
      id: "ab283940e559385728493857",
      start: "10.00",
      reservationType: ReservationType.Permanent,
      reservedBy: "John Doe",
      createdAt: "2021-01-01T00:00:00",
      updatedAt: "2021-01-01T00:00:00"
    },
    {
      id: "ab2839402059385728493857",
      start: "10.30",
      reservationType: ReservationType.Unreserved,
      reservedBy: undefined,
      createdAt: "2021-01-01T00:00:00",
      updatedAt: "2021-01-01T00:00:00"
    },
    {
      id: "ab2839402859385728493abc",
      start: "11.00",
      reservationType: ReservationType.Temporary,
      reservedBy: "Jane Doe",
      createdAt: "2021-01-01T00:00:00",
      updatedAt: "2021-01-01T00:00:00"
    },
    {
      id: "ab28394028593857c8493857",
      start: "11.30",
      reservationType: ReservationType.Temporary,
      reservedBy: "John Doe",
      createdAt: "2021-01-01T00:00:00",
      updatedAt: "2021-01-01T00:00:00"
    }
  ];
}
