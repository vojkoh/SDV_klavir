/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import config, { Environment } from '../../config';
import { Error } from 'mongoose';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (res.headersSent) return;

  console.error(err);

  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;

  res.status(statusCode).json({
    status: 'failed',
    code: statusCode,
    error: {
      message: err.message,
    },
  });
};

export default errorHandler;
