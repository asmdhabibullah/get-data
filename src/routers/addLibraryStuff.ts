import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import {
    AccountType, Auth
} from "../models/Auth";
import { Library } from "../models/Library";

const router = Router();

router.post(
    "/api/add/library/:libraryId/stuff/:userId",
    async (req: Request, res: Response) => {
        try {
            const { libraryId, userId } = req.params;

            const user = await Auth.findOne({ id: userId });
            const library = await Library.findOne({ id: libraryId })

            if (library && user) {
                library.librarySfaff?.push(user.id);
                user.accountType = AccountType.STAFF;
                // const library = Library.build({
                //     libraryName, totalEarning, libraryLocation, libraryOwner: user!.id
                // })
                await user.save();
                await library.save();
                return successHandler(res, 201, "Stuff Added Successfully...");
            } else {
                return errorHandler(res, 404, "User/Library not Found...");
            }

        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

export { router as deleteUserRouter }