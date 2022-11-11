import express, {Express, NextFunction, Request, Response} from 'express';
import {Logger} from './configuration/Logger';
import {GenericExceptionHandler} from './exception/GenericExceptionHandler';
import winston from 'winston';
import {BaseController} from './controller/BaseController';

export class Server {
    app: Express;

    constructor(port: String) {
        this.app = express();
        this.init();
        this.app.listen(+port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        });
    }

    init() {
        const logger = new Logger().getLogger();

        this.initServices()
            .then(() => {
                this.setupMiddleware(logger);
                this.setupControllers();
                this.setupErrorHandler();
            })
    }

    setupControllers(): void {
        console.log('here')
        // Register Controllers
        const Controllers: Array<BaseController> = [
        ]

        Controllers.forEach((c) => this.app.use(c.getRouter()))
    }

    setupMiddleware(logger: winston.Logger): void {
        this.app.use((req, res, next) => {
            logger.error("Access Logger", {
                method:req.method,
                path: req.path
            });
            next();
        });
    }

    private setupErrorHandler() {
        this.app.use(new GenericExceptionHandler().exceptionHandler);
    }

    private async initServices() {
        console.log('init service')
    }
}
