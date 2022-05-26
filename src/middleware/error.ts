import { ValidationError } from "express-validator";

abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract serializeErrors(): { message?: string; field?: string }[];
};

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(private errors: ValidationError[]) {
        super("400: Invalide request.");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    };

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        });
    };
};