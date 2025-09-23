import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Day, days2Names } from '../../classes/day';
import { TimeslotButtonComponent } from '../timeslot-button/timeslot-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timeslot } from '../../classes/timeslot';
import { ReservationType } from '../../classes/reservation-type';
import { DaysService } from '../../services/days.service';
import { SocketsService } from '../../services/sockets.service';
import { LivePresenceInfo } from '../../classes/livePresenceInfo';

const LS_KEY = "name"

@Component({
  selector: 'app-dayslot',
  standalone: true,
  imports: [TimeslotButtonComponent, CommonModule, FormsModule],
  templateUrl: './dayslot.component.html',
  styleUrl: './dayslot.component.css'
})
export class DayslotComponent implements OnInit, OnDestroy {
  constructor(private readonly dayService: DaysService, private readonly socketsService: SocketsService) {}
  @Input() dayNumber!: number;
  @ViewChild('modal') modal!: ElementRef;

  protected ReservationType = ReservationType;
  protected days2Names = days2Names;
  protected selectedTimeslots: Timeslot[] = [];
  protected day!: Day;
  protected reservationType: ReservationType = ReservationType.Temporary;
  protected reservedBy: string = "neznanec";
  protected livePresenceMap!: Record<number, Record<string, number>>;
  protected cleanupInterval!: any;

  ngOnInit(): void {
    this.getAllTimeslots();
    const name = localStorage.getItem(LS_KEY);
    if (name) {
      this.reservedBy = name;
    }

    this.socketsService.onNewReservation((message) => {
      // console.log(message);
      this.getAllTimeslots();
    });

    this.socketsService.onNewTimeslotSelection((data: LivePresenceInfo) => {
      // console.log(`SELECTED, ${data}`);
      const { name, dayNo, timeslotNo } = data
      if (dayNo === this.dayNumber) {
        this.livePresenceMap[timeslotNo] = {...this.livePresenceMap[timeslotNo] || {}}; // for rerendering
        this.livePresenceMap[timeslotNo][name] = Date.now();
      }
      console.log(this.livePresenceMap);
    });

    this.socketsService.onNewTimeslotUnselection((data: LivePresenceInfo) => {
      // console.log(`UNSELECTED, ${data}`);
      const { name, dayNo, timeslotNo } = data
      if (dayNo === this.dayNumber && this.livePresenceMap[timeslotNo]) {
        // filtering a dict :)
        this.livePresenceMap[timeslotNo] = 
          Object.fromEntries(
          Object.entries(this.livePresenceMap[timeslotNo])
          .filter((n) => n[0] !== name)
        )
      }
      // console.log(this.livePresenceMap);
    });

    this.cleanupInterval = setInterval(() => {
      // console.log("Timeslots cleaned UP");
      this.cleanUpLivePresence()
    }, 10000)
  }

  ngOnDestroy(): void {
    clearInterval(this.cleanupInterval);
  }

  ngOnChanges(): void {
    console.log("changes detected");
    this.livePresenceMap = {};
    this.selectedTimeslots = [];
    this.getAllTimeslots();
  }

  protected onBackgroundClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.hideModal();
    }
  }

  protected getAllTimeslots(): void {
    this.dayService.getDay(this.dayNumber).subscribe(day => {
      this.day = day;
    });
    this.selectedTimeslots = [];
  }

  protected async reserveTimeslots() {
    // TO-DO: dodaj body
    await Promise.all<Day>(
      Array.from(this.selectedTimeslots).map(
        (ts) =>
          new Promise((resolve) => {
            this.dayService.reserveTimeslots(
              this.dayNumber, 
              ts.timeslotNo,
              this.reservationType,
              this.reservedBy
            ).subscribe((res) => {
              resolve(res);
            })
          })
      )
    )
    
    console.log("Timeslots reserved");
    
    if (localStorage.getItem(LS_KEY) !== this.reservedBy) {
      localStorage.setItem(LS_KEY, this.reservedBy);
    }
    this.hideModal()
    this.getAllTimeslots()
    this.broadcastNewReservation(`reserved by ${this.reservedBy}`);
  }

  protected async unreserveTimeslots() {
    await Promise.all<Day>(
      Array.from(this.selectedTimeslots).map(
        (ts) =>
          new Promise((resolve) => {
            this.dayService.unreserveTimeslots(this.dayNumber, ts.timeslotNo).subscribe((res) => {
              resolve(res);
            })
          })
      )
    )
    console.log("Timeslots unreserved");
    this.getAllTimeslots();
    this.broadcastNewReservation(`unreserved by ${this.reservedBy}`);
  }

  protected selectTimeslot(timeslot: Timeslot): void {
    console.log("Timeslot selected");
    this.selectedTimeslots.push(timeslot);
    // this.broadcastNewSelection(true, timeslot.timeslotNo);
  }
 
  protected unselectTimeslot(timeslot: Timeslot): void {
    console.log("Timeslot unselected");
    this.selectedTimeslots = this.selectedTimeslots.filter(ts => ts._id != timeslot._id);
    // this.broadcastNewSelection(false, timeslot.timeslotNo);
  }

  protected changeReservationType(resType: ReservationType): void {
    this.reservationType = resType;
    return;
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

  protected showModal() {
    this.modal.nativeElement.style.display = 'block';
  }

  protected hideModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  protected broadcastNewReservation(message: string) {
    this.socketsService.newReservation(message);
  }

  protected cleanUpLivePresence() {
    const now = Date.now();
    for (const ts of Object.keys(this.livePresenceMap).map(Number)) {
      this.livePresenceMap[ts] = 
        Object.fromEntries(
          Object.entries(this.livePresenceMap[ts])
          .filter((n) => now - n[1] < 45000)
      )
    }
  }
}
