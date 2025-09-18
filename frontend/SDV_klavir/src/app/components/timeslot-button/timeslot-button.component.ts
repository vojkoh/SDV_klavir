import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Timeslot } from '../../classes/timeslot';
import { CommonModule } from '@angular/common';
import { ReservationType } from '../../classes/reservation-type';

@Component({
  selector: 'app-timeslot-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeslot-button.component.html',
  styleUrl: './timeslot-button.component.css'
})
export class TimeslotButtonComponent {
  @Input() timeslot!: Timeslot;
  @Output() selectTimeslotEvent = new EventEmitter<Timeslot>();
  @Output() unselectTimeslotEvent = new EventEmitter<Timeslot>();

  ReservationType = ReservationType;

  protected isSelected: boolean = false;

  protected select(): void {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.selectTimeslotEvent.emit(this.timeslot);
    } else {
      this.unselectTimeslotEvent.emit(this.timeslot);
    }
  }
}
