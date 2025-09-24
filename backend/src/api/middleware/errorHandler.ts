/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { CustomError } from '../customError';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (res.headersSent) return;

  console.error(err);
  if (err instanceof CustomError) {
    const statusCode = err.statusCode;

    res.status(statusCode).json({
      status: 'failed',
      code: statusCode,
      error: {
        message: err.message, // ta err je tisti, ki smo ga mi vrgli (message smo napisali mi!)
      },
    });
  } else {
    res.status(500).json({
      status: 'internal error',
      code: 500,
      error: {
        message: "Napaka na strežniku. Poskusite znova kasneje. Lp in lep pozdrav :)",
      },
    });
  }
};

export default errorHandler;
