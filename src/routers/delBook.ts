import {
    Router, Request, Response
} from "express";
import {
    errorHandler, sleep, successHandler
} from "../middleware";
import { Book } from "../models/Book";

const router = Router();

router.post(
    "/api/book/delete/:bookId",
    async (req: Request, res: Response) => {
        try {
            const { bookId } = req.params;
            await Book.findByIdAndDelete({ id: bookId }, (err: any, done: any) => {
                if (!err && done) {
                    return successHandler(res, 201, "Book Deleted Successfully...");
                }
            });
        } catch (error) {
            throw errorHandler(res, 500, "Book Database Error...");
        }
    });

export { router as delBookRouter }