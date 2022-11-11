import {NextFunction, Request, Response} from 'express';
import {BaseError} from './BaseError';
import {logger} from '../configuration/Logger';

export class GenericExceptionHandler {

    exceptionHandler(_err: Error, req: Request, res: Response, next: NextFunction) {
        let ignoredErrorKeys = new Set(['message', 'stack'])
        let message = _err.message;
        let err: BaseError;
        let code;

        if (_err && !(_err instanceof BaseError)) {
            const attrs: any = {};
            for (let key in _err) {
                if (!ignoredErrorKeys.has(key)) {
                    attrs[key] = (<any>_err)[key];
                }
            }
            err = new BaseError(null, _err.stack, attrs);
        } else {
            err = <any>_err;
        }

        logger.error(err.message, {stack: err.stack, code: err.getCode()});
        res.status(500)
            .json({
                message: message,
                code: err.getCode()
            })
    }

}


