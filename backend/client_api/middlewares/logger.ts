import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import DailyRotateFile from 'winston-daily-rotate-file';

// Obtenir __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer un répertoire de logs avec la date du jour
const logDirectory = path.join(__dirname, '../logs', new Date().toISOString().split('T')[0].replace(/-/g, '-'));

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'client_api' },
  transports: [
    new DailyRotateFile({
      filename: path.join(logDirectory, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
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
