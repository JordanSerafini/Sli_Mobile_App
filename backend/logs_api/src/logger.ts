import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';

// Obtenir __filename et __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtenir la date actuelle au format DD-MM-YYYY
const today = new Date();
const formattedDate = today.toLocaleDateString('fr-FR').split('/').reverse().join('-');

const logDirectory = path.join(__dirname, '../logs', `log-${formattedDate}`);
console.log(`Log directory: ${logDirectory}`);

// Créez le répertoire de logs s'il n'existe pas
if (!fs.existsSync(logDirectory)) {
  console.log(`Creating log directory at ${logDirectory}`);
  fs.mkdirSync(logDirectory, { recursive: true });
} else {
  console.log(`Log directory already exists at ${logDirectory}`);
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ timestamp, level, message, service, stack, ...meta }) => {
      const metaString = Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : '';
      const stackString = stack ? '\n' + stack : '';
      return `${timestamp} [${service}] ${level}: ${message}${stackString}${metaString}\n\n------------------------------------------------------------------------------------------------\n`;
    })
  ),
  defaultMeta: { service: 'logger_api' },
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
interface ErrorDetails {
  message: any;
  stack: any;
  url: any;
  method: any;
  user: any;
  ip: any;
  response?: {
    status: any;
    data: any;
  };
  rawError?: any; 
  timestamp?: string; // Add timestamp field
}

export const logError = (err: any, req: any) => {
  console.log('Logging error:', err);
  const errorDetails: ErrorDetails = {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    user: req.body.user || 'Unknown user',
    ip: req.ip,
    rawError: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    timestamp: new Date().toISOString() // Add timestamp value
  };

  if (err.response) {
    // Inclure les détails de la réponse de l'erreur, si disponibles
    errorDetails.response = {
      status: err.response.status,
      data: err.response.data
    };
  }

  logger.error('An error occurred', errorDetails);
};

export default logger;
