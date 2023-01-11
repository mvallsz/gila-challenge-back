const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: 'GILA Challenge' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/gila.log', level: 'info' }),
        new winston.transports.Console()
    ],
});

module.exports = logger;
