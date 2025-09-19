import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationType } from '../../classes/reservation-type';
import { Day, days2Names } from '../../classes/day';
import { Timeslot } from '../../classes/timeslot';
import { DayslotComponent } from "../dayslot/dayslot.component";
import { getDay } from 'date-fns';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule, DayslotComponent],
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent implements OnInit {
  
  protected daysForButtons = days2Names;
  protected currentDay: number = 1;
  protected currentIndex: number = 0;

  protected selectDay(day: number): void {
    this.currentDay = (day + 1) % 7; // for API fetching
    this.currentIndex = day;
  }

  ngOnInit(): void {
    this.currentDay = getDay(new Date()) // for API fetching;
    this.currentIndex = (getDay(new Date()) + 6) % 7; // for button highlighting
  }

  /*
    Sample data for testing purposes
  */

  
  // private users = ["John Doe", "Jane Doe", "Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack", "Karen", "Leo", "Mona", "Nina"];
  // private reservationTypes = [ReservationType.Permanent, ReservationType.Temporary, ReservationType.Unreserved];

  // protected days: Day[] = [
  //   {
  //     id: "1",
  //     date: new Date("2021-01-01T00:00:00"),
  //     dayOfTheWeek: DayOfTheWeek.Ponedeljek,
  //     timeslots: this.generateTimeslots(),
  //     createdAt: new Date("2021-01-01T00:00:00"),
  //     updatedAt: new Date("2021-01-01T00:00:00")
  //   },
  //   {
  //     id: "2",
  //     date: new Date("2021-01-02T00:00:00"),
  //     dayOfTheWeek: DayOfTheWeek.Torek,
  //     timeslots: this.generateTimeslots(),
  //     createdAt: new Date("2021-01-02T00:00:00"),
  //     updatedAt: new Date("2021-01-02T00:00:00")
  //   },
  //   {
  //     id: "3",
  //     date: new Date("2021-01-03T00:00:00"),
  //     dayOfTheWeek: DayOfTheWeek.Sreda,
  //     timeslots: this.generateTimeslots(),
  //     createdAt: new Date("2021-01-03T00:00:00"),
  //     updatedAt: new Date("2021-01-03T00:00:00")
  //   },
  //   {
  //     id: "4",
  //     date: new Date("2021-01-04T00:00:00"),
  //     dayOfTheWeek: DayOfTheWeek.Cetrtek,
  //     timeslots: this.generateTimeslots(),
  //     createdAt: new Date("2021-01-04T00:00:00"),
  //     updatedAt: new Date("2021-01-04T00:00:00")
  //   },
  //   {
  //     id: "5",
  //     date: new Date("2021-01-05T00:00:00"),
  //     dayOfTheWeek: DayOfTheWeek.Petek,
  //     timeslots: this.generateTimeslots(),
  //     createdAt: new Date("2021-01-05T00:00:00"),
  //     updatedAt: new Date("2021-01-05T00:00:00")
  //   },
  //   {
  //     id: "6",
  //     date: new Date("2021-01-06T00:00:00"),
  //     dayOfTheWeek: DayOfTheWeek.Sobota,
  //     timeslots: this.generateTimeslots(),
  //     createdAt: new Date("2021-01-06T00:00:00"),
  //     updatedAt: new Date("2021-01-06T00:00:00")
  //   },
  //   {
  //     id: "7",
  //     date: new Date("2021-01-07T00:00:00"),
  //     dayOfTheWeek: DayOfTheWeek.Nedelja,
  //     timeslots: this.generateTimeslots(),
  //     createdAt: new Date("2021-01-07T00:00:00"),
  //     updatedAt: new Date("2021-01-07T00:00:00")
  //   }
  // ];

  // private generateTimeslots(): Timeslot[] {
  //   const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //   const types = range.map(() => this.getRandomReservationType());
  //   return [
  //     {
  //       id: "1",
  //       start: "09:00",
  //       reservationType: types[1],
  //       reservedBy: types[1] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "2",
  //       start: "09:30",
  //       reservationType: types[2],
  //       reservedBy: types[2] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "3",
  //       start: "10:00",
  //       reservationType: types[3],
  //       reservedBy: types[3] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "4",
  //       start: "10:30",
  //       reservationType: types[4],
  //       reservedBy: types[4] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "5",
  //       start: "11:00",
  //       reservationType: types[5],
  //       reservedBy: types[5] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "6",
  //       start: "11:30",
  //       reservationType: types[6],
  //       reservedBy: types[6] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "7",
  //       start: "12:00",
  //       reservationType: types[7],
  //       reservedBy: types[7] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "8",
  //       start: "12:30",
  //       reservationType: types[8],
  //       reservedBy: types[8] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "9",
  //       start: "13:00",
  //       reservationType: types[9],
  //       reservedBy: types[9] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "10",
  //       start: "13:30",
  //       reservationType: types[10],
  //       reservedBy: types[10] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "11",
  //       start: "14:00",
  //       reservationType: types[11],
  //       reservedBy: types[11] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     },
  //     {
  //       id: "12",	
  //       start: "14:30",
  //       reservationType: types[12],
  //       reservedBy: types[12] === ReservationType.Unreserved ? undefined : this.getRandomUser(),
  //       createdAt: "2021-01-01T00:00:00",
  //       updatedAt: "2021-01-01T00:00:00"
  //     }
  //   ];
  // }

  // private getRandomUser(): string {
  //   return this.users[Math.floor(Math.random() * this.users.length)];
  // }

  // private getRandomReservationType(): ReservationType {
  //   return this.reservationTypes[Math.floor(Math.random() * this.reservationTypes.length)];
  // }

  /* 
    End of sample data
  */
}
