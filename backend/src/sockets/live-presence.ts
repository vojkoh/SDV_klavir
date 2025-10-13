import { Socket, Server } from "socket.io";

export function livePresenceSockets(io : Server, socket: Socket) {
    socket.on('timeslot_selected', (data) =>{
        socket.broadcast.emit('timeslot_selected', data);
    })

    socket.on('timeslot_unselected', (data) =>{
        socket.broadcast.emit('timeslot_unselected', data);
    })
}