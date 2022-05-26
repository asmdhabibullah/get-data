import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Book } from "../models/Book";

const router = Router();

router.get(
    "/api/book/:bookId",
    async (req: Request, res: Response) => {
        try {
            const { bookId } = req.params;
            // console.log("bookId", bookId);

            const book = await Book.findOne({ _id: bookId }).populate("library")
            // console.log("book", book);

            if (book) {
                return successHandler(res, 200, book);
            } else {
                return errorHandler(res, 404, "Book Not Found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Library Database Error...");
        }
    });

export { router as getBookRouter }