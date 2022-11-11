import winston from 'winston';

export class Logger {

    static __loggerInstance: Logger;
    static getStaticLogger() {
        if (!Logger.__loggerInstance) {
            console.log('initiated');
            Logger.__loggerInstance = new Logger();
        }
        return Logger.__loggerInstance.getLogger();
    }

    private logger: winston.Logger;

    constructor() {
        Logger.__loggerInstance = this;
        this.logger = this.setupLogger()
    }

    setupLogger(): winston.Logger {
        const logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.json(),
            handleExceptions: true,
            defaultMeta: {service: process.env.SERVICE_NAME, env: process.env.ENV, timestamp: new Date()},
            transports: [
                new winston.transports.File({filename: `${process.env.LOG_PATH}/error.log`, level: 'error'}),
                new winston.transports.File({filename: `${process.env.LOG_PATH}/app.log`}),
            ],
        })
        logger.exitOnError = false;

        if (process.env.ENV != "prod") {
            logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }

        return logger;
    }

    getLogger() {
        return this.logger;
    }

}

export const logger = Logger.getStaticLogger();
