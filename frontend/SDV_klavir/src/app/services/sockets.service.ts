import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'
import { environment } from '../../environments/environment';
import { LivePresenceInfo } from '../classes/livePresenceInfo';

@Injectable({
  providedIn: 'root'
})

export class SocketsService {
  private socket: Socket;

  constructor() {
    console.log(environment.socketUrl);
    this.socket = io(environment.socketUrl);
  }

  public newReservation(data: string): void {
    this.socket.emit('new_reservation', data);
  }

  public onNewReservation(callback: (message: string) => void): void {
    this.socket.on('new_reservation', callback);
  }

  public timeslotSelected(data: LivePresenceInfo): void {
    this.socket.emit('timeslot_selected', data)
  }

  public timeslotUnselected(data: LivePresenceInfo): void {
    this.socket.emit('timeslot_unselected', data)
  }

  public onNewTimeslotSelection(callback: (message: LivePresenceInfo) => void) {
    this.socket.on('timeslot_selected', callback);
  }

  public onNewTimeslotUnselection(callback: (message: LivePresenceInfo) => void) {
    this.socket.on('timeslot_unselected', callback);
  }
}
