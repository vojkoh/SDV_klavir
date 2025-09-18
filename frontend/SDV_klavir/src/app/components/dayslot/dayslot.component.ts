import { Component, Input } from '@angular/core';
import { Day } from '../../classes/day';
import { TimeslotButtonComponent } from '../timeslot-button/timeslot-button.component';
import { CommonModule } from '@angular/common';
import { Timeslot } from '../../classes/timeslot';
import { ReservationType } from '../../classes/reservation-type';

@Component({
  selector: 'app-dayslot',
  standalone: true,
  imports: [TimeslotButtonComponent, CommonModule],
  templateUrl: './dayslot.component.html',
  styleUrl: './dayslot.component.css'
})
export class DayslotComponent {
  @Input() day!: Day; 

  protected selectedTimeslots: Timeslot[] = [];

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
    this.selectedTimeslots = this.selectedTimeslots.filter(ts => ts.id != timeslot.id);
  }

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
}
