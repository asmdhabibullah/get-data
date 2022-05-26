import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Auth } from "../models/Auth";
import { Library } from "../models/Library";
import { Payment } from "../models/Payment";

const router = Router();

router.post(
    "/api/add/library",
    async (req: Request, res: Response) => {
        try {
            const {
                userId,
                libraryName,
                libraryLocation,
            } = req.body;

            const user = await Auth.findOne({ id: userId });

            const library = Library.build({
                libraryName, libraryLocation, libraryOwner: user!.id
            });

            if (user && library) {
                user.library = library.id;
                await user!.save();
                await library!.save();
                return successHandler(res, 201, "Library Created Successfully...");
            }
            else {
                return errorHandler(res, 404, "User not Found...");
            }

        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

export { router as addLibraryRouter }