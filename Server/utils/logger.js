const { createLogger, format, transports } = require('winston');
const path = require('path');

// Log folder path
const logDir = path.join(__dirname, '../logs');

// Common log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// Owner logger
const ownerLogger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join(logDir, 'owner-error.log'),
      level: 'error',
    }),
    new transports.File({ filename: path.join(logDir, 'owner-combined.log') }),
  ],
});

// User logger
const userLogger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join(logDir, 'user-error.log'),
      level: 'error',
    }),
    new transports.File({ filename: path.join(logDir, 'user-combined.log') }),
  ],
});

module.exports = { ownerLogger, userLogger };
