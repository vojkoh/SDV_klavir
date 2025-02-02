import { Component, Input } from '@angular/core';
import { Day } from '../../classes/day';
import { TimeslotButtonComponent } from '../timeslot-button/timeslot-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dayslot',
  standalone: true,
  imports: [TimeslotButtonComponent, CommonModule],
  templateUrl: './dayslot.component.html',
  styleUrl: './dayslot.component.css'
})
export class DayslotComponent {
  @Input() day!: Day; 
}
