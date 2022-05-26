import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Auth } from "../models/Auth";

const router = Router();

router.get(
    "/api/users",
    async (req: Request, res: Response) => {
        try {
            const users = await Auth.find({});
            // console.log(users);

            if (users && users.length > 0) {
                return successHandler(res, 200, users);
            } else {
                return errorHandler(res, 404, "User Not Found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Auth Database Error...");
        }
    });

export { router as getUsersRouter }