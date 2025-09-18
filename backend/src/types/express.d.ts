import { Response } from 'express';

declare global {
  namespace Express {
    export interface Response {
      success: (data?: unknown = undefined, options?: { metadata?: undefined; code?: number}) => Response;
    }
  }
}