import {
    Router, Request, Response
} from "express";
import {
    errorHandler, sleep, successHandler
} from "../middleware";
import { Auth } from "../models/Auth";
import { Book } from "../models/Book";
import { BookReview } from "../models/BookReview";

const router = Router();

router.post(
    "/api/book/review/:bookId/reviewer/:reviewerId",
    async (req: Request, res: Response) => {
        try {
            const { review, point } = req.body;
            const { bookId, reviewerId } = req.params;
            const book = await Book.findOne({ id: bookId });
            const user = await Auth.findOne({ id: reviewerId });

            const newReview = BookReview.build({
                review, point, user: user?.id, book: book?.id
            });

            book?.reviews?.push(newReview?.id);

            if (user && book) {
                await book.save();
                await newReview.save();
                return successHandler(res, 201, "Book Review Submitted Successfully...");
            };

        } catch (error) {
            throw errorHandler(res, 500, "Book Database Error...");
        }
    });

export { router as delBookRouter }