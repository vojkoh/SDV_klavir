import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  
})
export class AlertComponent implements OnInit {
  constructor(private readonly alertService: AlertService) {}

  public alert?: string;
  private timerId: any;
  
  ngOnInit(): void {
    this.alertService.getAlert().subscribe((value) =>{
      this.alert = value;
      this.resetTimer();
    })
  }

  public resetTimer(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() =>{
      this.alert = undefined;
    }, 5000);
  }
  
}
