/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (res.headersSent) return;

  console.error(err);

  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;

  res.status(statusCode).json({
    status: 'failed',
    code: statusCode,
    error: {
      message: err.message, // ta err je tisti, ki smo ga mi vrgli (message smo napisali mi!)
    },
  });
};

export default errorHandler;
