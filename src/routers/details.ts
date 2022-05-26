import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Auth } from "../models/Auth";

const router = Router();

router.get(
    "/api/auth/user/details/:id",
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            // console.log(id);
            await Auth.findOne({ id }, async (err: any, user: any) => {
                console.log(user);
                if (!err && user) {
                    return successHandler(res, 200, user);
                } else {
                    return errorHandler(res, 404, "User not found...");
                }
            })
        } catch (error) {
            return errorHandler(res, 500, "Server error...");
        }
    });

export { router as detailsUserRouter }