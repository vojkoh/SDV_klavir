import express from 'express';
import 'express-async-errors';

import helmet from 'helmet';
import cors from 'cors';

import api from './api/router';
import addHelperFunctions from './api/middleware/addHelperFunctions';
import errorHandler from './api/middleware/errorHandler';
import config from './config';

const app = express();

app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(express.urlencoded({ limit: '1mb', extended: true, parameterLimit: 100 }));
app.use(express.json({ limit: '1mb' }));

app.use(addHelperFunctions);

app.use(config.api.prefix, api);

app.get('/', (req, res) => {
  res.redirect('/v1/docs');
});

app.use(errorHandler);

export default app;
