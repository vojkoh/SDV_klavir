import { Socket, Server } from "socket.io";



export function registerReservationSockets(io : Server, socket: Socket) {
    socket.on('new_reservation', (data) =>{
        io.emit('reservation_created');
    })
}