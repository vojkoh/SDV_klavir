import express from 'express';
import 'express-async-errors';

import helmet from 'helmet';
import cors from 'cors';

import api from './api';
import addHelperFunctions from './api/middleware/addHelperFunctions';
import errorHandler from './api/middleware/errorHandler';
import config from './config';
import { Environment } from './config';

const app = express();

if (config.env === Environment.Production) {
  app.use(cors());

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: false,
    })
  );
}

app.use(express.json({ limit: '1mb' }));

app.use(addHelperFunctions);

app.use(config.api.prefix, api);

app.get('/', (req, res) => {
  res.redirect('/v1/docs');
});

app.use(errorHandler);

export default app;