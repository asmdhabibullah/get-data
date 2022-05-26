import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Library } from "../models/Library";

const router = Router();

router.get(
    "/api/libraries",
    async (req: Request, res: Response) => {
        try {
            const libraries = await Library.find()
            if (libraries && libraries.length > 0) {
                return successHandler(res, 200, libraries);
            } else {
                return errorHandler(res, 404, "Libraries Not Found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Library Database Error...");
        }
    });

export { router as getLibrariesRouter }