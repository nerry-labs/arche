import {logger} from '../configuration/Logger';

export class BaseError extends Error {
    ERROR_CODE_PREFIX = "APP-ERROR";
    TOTAL_LENGTH = 4;

    code;
    message;
    stack;
    args;
    errorTypes: any = {
        "UNKWN": "Unknown Error Ocurred"
    }

    constructor(code: string | null, stack: string|undefined, args: any) {
        super();
        this.code = code || 1;
        this.message = !code ? super.message : this.errorTypes[this.code];
        this.stack = stack || super.stack;
        this.args = args;
    }

    getCode() {
        return `${this.ERROR_CODE_PREFIX}-${String(this.code).padStart(this.TOTAL_LENGTH, '0')}`;
    }

}
