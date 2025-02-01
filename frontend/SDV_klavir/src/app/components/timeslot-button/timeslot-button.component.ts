import { Component, Input } from '@angular/core';
import { Timeslot } from '../../classes/timeslot';

@Component({
  selector: 'app-timeslot-button',
  standalone: true,
  imports: [],
  templateUrl: './timeslot-button.component.html',
  styleUrl: './timeslot-button.component.css'
})
export class TimeslotButtonComponent {
  @Input() timeslot!: Timeslot;
}
