import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  // objektu res dodamo funkcijo success, ki jo lahko uporabimo v controllerjih
  res.success = (data: unknown = undefined, options?: { metadata?: undefined; code?: number }) => {
    const code = options?.code || 200;
    const metadata = options?.metadata || undefined;

    return res.status(code).json({
      status: 'success',
      code: code,
      data,
      metadata: metadata,
    });
  };

  return next();
};
