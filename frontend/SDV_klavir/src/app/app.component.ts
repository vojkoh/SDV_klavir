import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrameworkComponent } from './components/framework/framework.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrameworkComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SDV_klavir';

  
}
