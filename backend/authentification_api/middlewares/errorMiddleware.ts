import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, {
    stack: err.stack,
    method: req.method,
    url: req.url,
    status: res.statusCode,
  });
  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorMiddleware;
