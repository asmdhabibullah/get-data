import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Book } from "../models/Book";

const router = Router();

router.get(
    "/api/books",
    async (req: Request, res: Response) => {
        try {
            const books = await Book.find({})
            if (books && books.length > 0) {
                return successHandler(res, 200, books);
            } else {
                return errorHandler(res, 404, "Books Not Found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Library Database Error...");
        }
    });

export { router as getBooksRouter }