import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Library } from "../models/Library";

const router = Router();

router.post(
    "/api/library/:libraryId",
    async (req: Request, res: Response) => {
        try {
            const { libraryId } = req.params;
            const library = await Library.findOne({
                id: libraryId
            })
            if (library) {
                return successHandler(res, 200, library);
            } else {
                return errorHandler(res, 404, "Library Not Found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Library Database Error...");
        }
    });

export { router as deleteUserRouter }