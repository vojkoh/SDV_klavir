import { registerReservationSockets } from "./reservation";
import { livePresenceSockets } from "./live-presence";
import config, { Environment } from "../config";

import { Server as HttpServer } from "http";
import { Server as SocketIO } from 'socket.io'

export function initSockets(server: HttpServer) {
  const io = new SocketIO(server, {
    cors: { origin: config.env === Environment.Production ? config.frontendURL : "*" }
  });

  if (!io) {
    return undefined;
  }

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    registerReservationSockets(io, socket);
    livePresenceSockets(io, socket);
  });
}
