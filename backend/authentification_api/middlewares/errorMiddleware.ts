import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { stack: err.stack });
  
  res.status(500).send('Something went wrong!');
};

export default errorMiddleware;
