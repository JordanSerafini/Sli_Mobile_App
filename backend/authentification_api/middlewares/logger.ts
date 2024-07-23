import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = path.join(process.cwd(), 'logs', new Date().toISOString().split('T')[0].replace(/-/g, '-'));

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'authentification_api' },
  transports: [
    new DailyRotateFile({
      filename: path.join(logDirectory, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      auditFile: path.join(logDirectory, 'error-%DATE%-audit.json'),
      silent: true 
    }),
    new DailyRotateFile({
      filename: path.join(logDirectory, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      auditFile: path.join(logDirectory, 'combined-%DATE%-audit.json'),
      silent: true 
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

export default logger;
