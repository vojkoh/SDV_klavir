import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Timeslot } from '../../classes/timeslot';
import { CommonModule } from '@angular/common';
import { ReservationType } from '../../classes/reservation-type';
import { SocketsService } from '../../services/sockets.service';

@Component({
  selector: 'app-timeslot-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeslot-button.component.html',
  styleUrl: './timeslot-button.component.css'
})
export class TimeslotButtonComponent implements OnInit, OnDestroy {
  constructor(private readonly socketsService: SocketsService) {}

  @Input() timeslot!: Timeslot;
  @Input() livePresence!: Record<string, number>;
  @Input() dayNumber!: number;
  @Input() reserver!: string;
  @Output() selectTimeslotEvent = new EventEmitter<Timeslot>();
  @Output() unselectTimeslotEvent = new EventEmitter<Timeslot>();

  ReservationType = ReservationType;

  protected isSelected: boolean = false;
  protected livePresenceTimer?: any;
  protected livePresenceNames!: String[];

  ngOnInit(): void {
    this.livePresenceNames = Object.keys(this.livePresence);
  }

  ngOnDestroy(): void {
    console.log("hartbeats stopped - DESTROY");
    if (this.isSelected) {
      this.broadcastNewSelection(false, this.timeslot.timeslotNo);
    }
    clearInterval(this.livePresenceTimer);
  }

  ngOnChanges() {
    this.livePresenceNames = Object.keys(this.livePresence);
  }

  protected select(): void {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.selectTimeslotEvent.emit(this.timeslot);
      this.broadcastNewSelection(true, this.timeslot.timeslotNo)
    } else {
      this.unselectTimeslotEvent.emit(this.timeslot);
      this.broadcastNewSelection(false, this.timeslot.timeslotNo)
    }
  }

  protected broadcastNewSelection(isSelection: boolean, timeslotNo: number) {
    const data = {
      name: this.reserver,
      dayNo: this.dayNumber,
      timeslotNo: timeslotNo
    }
    if (isSelection) {
      this.socketsService.timeslotSelected(data);
      this.livePresenceTimer = setInterval(() => {
        console.log("heartbeat sent");
        this.socketsService.timeslotSelected(data);
      }, 15000);
    } else {
      this.socketsService.timeslotUnselected(data);
      console.log("hartbeats stopped");
      clearInterval(this.livePresenceTimer);
    }
  }
}
