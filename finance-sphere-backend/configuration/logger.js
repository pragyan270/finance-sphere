const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', 
    format: format.combine(
        format.timestamp(),
        format.simple() 
    ),
    transports: [
        new transports.Console({ 
            format: format.combine(
                format.colorize(), 
                format.simple()
            )
        }),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }) 
    ]
});

module.exports = logger; 
