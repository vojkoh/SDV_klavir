import { Component, Input, OnInit } from '@angular/core';
import { Day, days2Names } from '../../classes/day';
import { TimeslotButtonComponent } from '../timeslot-button/timeslot-button.component';
import { CommonModule } from '@angular/common';
import { Timeslot } from '../../classes/timeslot';
import { ReservationType } from '../../classes/reservation-type';
import { DaysService } from '../../services/days.service';

@Component({
  selector: 'app-dayslot',
  standalone: true,
  imports: [TimeslotButtonComponent, CommonModule],
  templateUrl: './dayslot.component.html',
  styleUrl: './dayslot.component.css'
})
export class DayslotComponent implements OnInit {
  constructor(private readonly dayService: DaysService) {}
  @Input() dayNumber!: number;

  protected days2Names = days2Names;
  protected selectedTimeslots: Timeslot[] = [];

  ngOnInit(): void {
    this.getAllTimeslots();
  }

  ngOnChanges(): void {
    this.getAllTimeslots();
  }

  protected day: Day = {
    _id: "68cb9ba577307b421d3ce495",
    date: new Date("2025-09-19T05:45:55.666Z"),
    dayOfTheWeek: 5,
    timeslots: [
      {
        timeslotNo: 0,
        start: "1",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce496",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 1,
        start: "2",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce497",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 2,
        start: "3",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce498",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 3,
        start: "4",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce499",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 4,
        start: "5",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce49a",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 5,
        start: "6",
        reservationType: ReservationType.Temporary,
        _id: "68cb9ba577307b421d3ce49b",
        reservedBy: "Katja"
      },
      {
        timeslotNo: 6,
        start: "7",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce49c",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 7,
        start: "8",
        reservationType: ReservationType.Unreserved,
        reservedBy: "nobody",
        _id: "68cb9ba577307b421d3ce49d",
      },
      {
        timeslotNo: 8,
        start: "9",
        reservationType: ReservationType.Permanent,
        reservedBy: "Vojko",
        _id: "68cb9ba577307b421d3ce49e"
      },
      {
        timeslotNo: 9,
        start: "10",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce49f",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 10,
        start: "11",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce4a0",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 11,
        start: "12",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce4a1",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 12,
        start: "13",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce4a2",
        reservedBy: "nobody"
      },
      {
        timeslotNo: 13,
        start: "14",
        reservationType: ReservationType.Unreserved,
        _id: "68cb9ba577307b421d3ce4a3",
        reservedBy: "nobody"
      }
    ]
  }

  protected getAllTimeslots(): void {
    this.dayService.getDay(this.dayNumber).subscribe(day => {
      this.day = day;
    });
  }

  protected reserveTimeslots(): void {
    console.log("Timeslots reserved");
  }

  protected unreserveTimeslots(): void {
    console.log("Timeslots unreserved");
  }

  protected selectTimeslot(timeslot: Timeslot): void {
    console.log("Timeslot selected");
    this.selectedTimeslots.push(timeslot);
  }
 
  protected unselectTimeslot(timeslot: Timeslot): void {
    console.log("Timeslot unselected");
    this.selectedTimeslots = this.selectedTimeslots.filter(ts => ts._id != timeslot._id);
  }

  /* 
    Helper functions
  */

  protected selectedTimeslotTypes() : ReservationType | null {
    if (this.selectedTimeslots.length == 0) {
      return null;
    }

    const types = this.selectedTimeslots.map(timeslot => timeslot.reservationType);
    let tmp: ReservationType = types[0];
    for (let type of types) {
      if (type != tmp) {
        return null;
      }
      tmp = type;
    }
    return tmp;
  }

  protected dayNameFromNumber(dayNumber: number): string {
    console.log(dayNumber);
    return this.days2Names.find(day => day.dayOfTheWeek == dayNumber)?.name || "Unknown day";
  }
}
