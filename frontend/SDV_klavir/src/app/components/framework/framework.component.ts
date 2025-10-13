import { Component } from '@angular/core';
import { TimetableComponent } from "../timetable/timetable.component";

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [TimetableComponent],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.css'
})
export class FrameworkComponent {

}
