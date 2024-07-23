import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import DailyRotateFile from 'winston-daily-rotate-file';

// Obtenir __filename et __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtenir la date actuelle au format DD-MM-YYYY
const today = new Date();
const formattedDate = today.toLocaleDateString('fr-FR').split('/').reverse().join('-'); 

const logDirectory = path.join(__dirname, '../logs', formattedDate);

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-YYYY HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ timestamp, level, message, service, stack, ...meta }) => {
      const metaString = Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : '';
      const stackString = stack ? '\n' + stack : '';
      return `${timestamp} [${service}] ${level}: ${message}${stackString}${metaString}\n\n------------------------------------------------------------------------------------------------\n`;
    })
  ),
  defaultMeta: { service: 'client_api' },
  transports: [
    new DailyRotateFile({
      filename: path.join(logDirectory, 'combined-%DATE%.log'),
      datePattern: 'DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      auditFile: path.join(logDirectory, 'audit.json')
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

logger.on('error', (err) => {
  console.error('Error occurred in logger:', err);
});

// Fonction d'assistance pour enregistrer les erreurs
export const logError = (err: any, req: any) => {
  logger.error('An error occurred', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });
};

export default logger;
