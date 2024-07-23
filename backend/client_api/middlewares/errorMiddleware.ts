import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('An error occurred', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  res.status(500).json({
    message: 'Internal Server Error',
  });
};

export default errorMiddleware;
