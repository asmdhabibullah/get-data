import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import { RequestValidationError } from './error';

export const NotFoundError = () => {
    return "Request Not Found..."
};

export const errorHandler = (res: Response, status: number, message: any) => {
    return res.status(status).json({
        message: message || "Request Not Found..."
    })
};

export const ServerError = (res: Response, status: number, message: any) => {
    return "Request Not Found..."
};

export const successHandler = (res: Response, status: number, message: any) => {
    return res.status(status).json({
        message: message || "Request Not Found..."
    });
};


export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    console.log("Errors:", errors);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    next();
};


export const sleep = async (func: Function, ns: number) => setTimeout(func, ns);