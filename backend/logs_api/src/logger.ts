import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const today = new Date();
const formattedDate = today.toLocaleDateString('fr-FR').split('/').reverse().join('-');

const logDirectory = path.join(__dirname, '../logs', `log-${formattedDate}`);

if (!fs.existsSync(logDirectory)) {
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
    format.printf(({ timestamp, level, message, service, user, stack, ...meta }) => {
      const metaString = Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : '';
      const stackString = stack ? '\n' + stack : '';
      return `${timestamp} [${service}] ${user} ${level}: ${message}${stackString}${metaString}\n\n------------------------------------------------------------------------------------------------\n`;
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

export const logError = (error, req) => {
  console.log('logError received:', error); // Débogage
  const errorDetails = {
    message: error.message,
    stack: error.stack,
    url: error.url || req.originalUrl,
    method: error.method || req.method,
    user: error.user || 'Unknown user',
    ip: req.ip,
  };

  if (error.response) {
    errorDetails.response = {
      status: error.response.status,
      data: error.response.data
    };
  }

  logger.error('An error occurred', errorDetails);
};

export default logger;
