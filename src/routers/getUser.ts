import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Auth } from "../models/Auth";

const router = Router();

router.get(
    "/api/user/:email",
    async (req: Request, res: Response) => {
        try {
            const { email } = req.params;
            const user = await Auth.findOne({ email });
            console.log(user);

            if (user) {
                return successHandler(res, 200, user);
            } else {
                return errorHandler(res, 404, "User Not Found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "User Database Error...");
        }
    });

export { router as getUserRouter }