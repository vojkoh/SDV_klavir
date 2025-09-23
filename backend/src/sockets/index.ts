import { registerReservationSockets } from "./reservation";
// const registerPresenceSockets = require("./presence");

import { Server as HttpServer } from "http";
import { Server as SocketIO } from 'socket.io'

export function initSockets(server: HttpServer) {
  const io = new SocketIO(server, {
    cors: { origin: "*" } // TO-DO: configure properly in prod
  });

  if (!io) {
    return undefined;
  }

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // registerReservationSockets(io, socket);
    // registerPresenceSockets(io, socket);
  });
}
