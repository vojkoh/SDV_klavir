import { Component } from '@angular/core';
import { TimeslotButtonComponent } from "../timeslot-button/timeslot-button.component";
import { CommonModule } from '@angular/common';
import { DayOfTheWeek } from '../../classes/day-of-the-week';
import { ReservationType } from '../../classes/reservation-type';
import { Day } from '../../classes/day';
import { Timeslot } from '../../classes/timeslot';
import { DayslotComponent } from "../dayslot/dayslot.component";

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [TimeslotButtonComponent, CommonModule, DayslotComponent],
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {
  private users = ["John Doe", "Jane Doe", "Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack", "Karen", "Leo", "Mona", "Nina"];

  days: Day[] = [
    {
      id: "1",
      date: new Date("2021-01-01T00:00:00"),
      dayOfTheWeek: DayOfTheWeek.Ponedeljek,
      timeslots: this.generateTimeslots(),
      createdAt: new Date("2021-01-01T00:00:00"),
      updatedAt: new Date("2021-01-01T00:00:00")
    },
    {
      id: "2",
      date: new Date("2021-01-02T00:00:00"),
      dayOfTheWeek: DayOfTheWeek.Torek,
      timeslots: this.generateTimeslots(),
      createdAt: new Date("2021-01-02T00:00:00"),
      updatedAt: new Date("2021-01-02T00:00:00")
    },
    {
      id: "3",
      date: new Date("2021-01-03T00:00:00"),
      dayOfTheWeek: DayOfTheWeek.Sreda,
      timeslots: this.generateTimeslots(),
      createdAt: new Date("2021-01-03T00:00:00"),
      updatedAt: new Date("2021-01-03T00:00:00")
    },
    {
      id: "4",
      date: new Date("2021-01-04T00:00:00"),
      dayOfTheWeek: DayOfTheWeek.Cetrtek,
      timeslots: this.generateTimeslots(),
      createdAt: new Date("2021-01-04T00:00:00"),
      updatedAt: new Date("2021-01-04T00:00:00")
    },
    {
      id: "5",
      date: new Date("2021-01-05T00:00:00"),
      dayOfTheWeek: DayOfTheWeek.Petek,
      timeslots: this.generateTimeslots(),
      createdAt: new Date("2021-01-05T00:00:00"),
      updatedAt: new Date("2021-01-05T00:00:00")
    },
    {
      id: "6",
      date: new Date("2021-01-06T00:00:00"),
      dayOfTheWeek: DayOfTheWeek.Sobota,
      timeslots: this.generateTimeslots(),
      createdAt: new Date("2021-01-06T00:00:00"),
      updatedAt: new Date("2021-01-06T00:00:00")
    },
    {
      id: "7",
      date: new Date("2021-01-07T00:00:00"),
      dayOfTheWeek: DayOfTheWeek.Nedelja,
      timeslots: this.generateTimeslots(),
      createdAt: new Date("2021-01-07T00:00:00"),
      updatedAt: new Date("2021-01-07T00:00:00")
    }
  ];

  private generateTimeslots(): Timeslot[] {
    return [
      {
        id: "1",
        start: "09:00",
        reservationType: ReservationType.Permanent,
        reservedBy: this.getRandomUser(),
        createdAt: "2021-01-01T00:00:00",
        updatedAt: "2021-01-01T00:00:00"
      },
      {
        id: "2",
        start: "09:30",
        reservationType: ReservationType.Permanent,
        reservedBy: this.getRandomUser(),
        createdAt: "2021-01-01T00:00:00",
        updatedAt: "2021-01-01T00:00:00"
      },
      {
        id: "3",
        start: "10:00",
        reservationType: ReservationType.Temporary,
        reservedBy: this.getRandomUser(),
        createdAt: "2021-01-01T00:00:00",
        updatedAt: "2021-01-01T00:00:00"
      },
      {
        id: "4",
        start: "10:30",
        reservationType: ReservationType.Temporary,
        reservedBy: this.getRandomUser(),
        createdAt: "2021-01-01T00:00:00",
        updatedAt: "2021-01-01T00:00:00"
      },
      {
        id: "5",
        start: "11:00",
        reservationType: ReservationType.Unreserved,
        reservedBy: undefined,
        createdAt: "2021-01-01T00:00:00",
        updatedAt: "2021-01-01T00:00:00"
      },
      {
        id: "6",
        start: "11:30",
        reservationType: ReservationType.Permanent,
        reservedBy: this.getRandomUser(),
        createdAt: "2021-01-01T00:00:00",
        updatedAt: "2021-01-01T00:00:00"
      }
    ];
  }

  private getRandomUser(): string {
    return this.users[Math.floor(Math.random() * this.users.length)];
  }
}
