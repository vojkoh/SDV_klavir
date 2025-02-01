import { Server } from 'http';
import mongoose, { Error, Mongoose } from 'mongoose';

import app from './app';
import config from './config';
import { Request, Response, NextFunction } from 'express';

const { port } = config.api;

let mongooseClient: Mongoose | undefined = undefined;
let server: Server | undefined = undefined;

async function gracefulShutdown(exitCode: number = 0) {
  console.log('Shutting down ...', 'shutdown.start');
  if (server) {
    console.log('Closing HTTP server ...', 'shutdown.server.close');
    await new Promise((resolve) => server?.close(resolve));
    console.log('HTTP server closed.', 'shutdown.server.close.success');
  }

  if (mongooseClient) {
    console.log('Disconnecting from mongodb ...', 'shutdown.mongo.disconnect');
    await mongooseClient?.disconnect();
    console.log('Disconnected from mongodb.', 'shutdown.mongo.disconnect.success');
  }
  process.exit(exitCode);
}

async function mongooseInit() {
  try {
    const mongooseClient = await mongoose.connect(config.database.url);
    console.log('Connected to MongoDB.', 'mongoose.init.success');

    return mongooseClient;
  } catch (err) {
    throw new Error('Failed to connect to MongoDB');
  }
}

async function bootstrap() {
  console.log(`Bootstrapping ${config.serviceName} ...`, 'bootstrap.start');

  process
    .on('SIGTERM', () => {
      console.log('SIGTERM signal received.', 'process.sigterm');
      gracefulShutdown();
    })
    .on('SIGINT', () => {
      console.log('SIGINT signal received.', 'process.sigint');
      gracefulShutdown();
    })
    // .on('SIGKILL', () => {
    //   console.log('SIGKILL signal received.', 'process.sigint');
    //   gracefulShutdown();
    // })
    .on('uncaughtException', (err) => {
      console.error(err);
      gracefulShutdown(1);
    })
    .on('unhandledRejection', (err) => {
      console.error(err);
      gracefulShutdown(1);
    });

  mongooseClient = await mongooseInit();

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    gracefulShutdown(1);
  });

  server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`, 'bootstrap.server.listening');
  });

  console.log(`Bootstrap succeeded.`, 'bootstrap.success');
}

bootstrap();
