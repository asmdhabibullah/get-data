import {
    Router, Request, Response
} from "express";
import {
    body
} from "express-validator";
import {
    errorHandler, ServerError, successHandler, validateRequest
} from "../middleware";
import { Auth } from "../models/Auth";

const router = Router();

router.post("/api/auth/user/signout",
    [
        body('email').isEmail().withMessage('Email must be valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const existingUser = await Auth.findOne({ email });
            // console.log(existingUser);

            if (existingUser) {
                req.session = null;
                return successHandler(res, 200, "User logout successfully!");
            }
            return errorHandler(res, 404, "User not found!")
        } catch (error) {
            throw errorHandler(res, 500, "Server erroe...");
        }
    });

export { router as signoutUserRouter }