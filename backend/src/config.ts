/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

const envFound = dotenv.config();

const serviceName = process.env.SERVICE_NAME || 'sdv_klavir/backend';
// if (envFound.error && !process.env.JWT_SECRET) {
//   // If this happens the app shouldn't even start
//   console.log(
//     `\x1b[90m[${new Date().toISOString()}][\x1b[1msevere\x1b[0m\x1b[90m][${serviceName}][${os.hostname()}] \x1b[37mCouldn't find .env file. \x1b[90mMetadata: {"type":"app.backend.startup.config.loadenv.error"}\x1b[0m`
//   );
//   process.exit(0);
// }

if (!process.env.TZ) {
  process.env.TZ = 'Europe/Ljubljana';
}

const frontendURL = process.env.FRONTEND_URL || "https://zmajkotrek.si";
const externalURL = process.env.EXTERNAL_URL || "https://zmajkotrek.si";
const apiPrefix = process.env.API_PREFIX || '/v1';

export default {
  // Environment (e.g. development, staging, production).
  env: (process.env.NODE_ENV as Environment) || Environment.Production,

  api: {
    // Port on which the server will run.
    port: process.env.PORT || 3000,
    // Prefix for all API routes. (e.g. "/v1")
    prefix: apiPrefix,
  },

  // Used primarily by winston logger
  serviceName,

  database: {
    url: process.env.DATABASE_URL || 'mongodb://root:nullSkillz42@localhost:27017',

    mongooseSchemaOptions: {
      versionKey: false,
      id: true,
    } satisfies mongoose.SchemaOptions,
  },

  // Public URL of this API server.
  externalURL,

  // Full URL of this API server including the API prefix.
  fullExternalURL: `${externalURL}${apiPrefix}`,

  // URL of the default frontend environment.
  frontendURL,

  cors: {
    // Allowed origins for CORS.
    allowedOrigins: (frontendURL || '').split(',').map((origin) => origin.trim()),
  },
};
