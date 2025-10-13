export class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, status?: number) {
        super(message);
        this.statusCode = status || 400;
        Error.captureStackTrace(this, this.constructor);
    }
}