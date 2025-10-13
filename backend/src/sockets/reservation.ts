import { Socket, Server } from "socket.io";

export function registerReservationSockets(io : Server, socket: Socket) {
    socket.on('new_reservation', (data) =>{
        socket.broadcast.emit('new_reservation', data);
    })
}