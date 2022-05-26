import {
    Router, Request, Response, NextFunction
} from "express";
import {
    errorHandler
} from ".";
import { verify } from 'jsonwebtoken';
import { Auth } from "../models/Auth";
import { JWT_KEY } from "../config";

const router = Router();

router.get(
    "/api/auth/user/verify",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = req.headers["Authorization"] || req.body || req.params;
            verify(token, JWT_KEY, async (err: any, decoded: any) => {
                if (!err && decoded) {
                    const { id } = decoded;
                    const userExist = await Auth.findOne({ id });
                    if (!userExist) {
                        throw errorHandler(res, 404, "User not found!");
                        // throw new BadRequestError('Invalid credentials');
                    } else {
                        // return successHandler(res, 200, {
                        //     id, firstName, lastName, phoneNumber, address, valide: true
                        // });
                        // req.headers = {
                        //     verify: true
                        // }
                        return next();
                    }
                } else {
                    throw errorHandler(res, 404, "User not verified!");
                }
            });
        } catch (error) {
            throw errorHandler(res, 500, "Server error...");
        };

    });

export { router as signinUserRouter }