import {
    Router, Request, Response
} from "express";
import {
    body
} from "express-validator";
import {
    errorHandler, sleep, successHandler, validateRequest
} from "../middleware";
import { Book } from "../models/Book";
import { Library } from "../models/Library";

const router = Router();

router.post(
    "/api/books/add/:libraryId",
    [
        body("books").isObject().withMessage('Data must be provide'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const { books } = req.body;
            const { libraryId } = req.params;

            const library = await Library.findOne({
                id: libraryId
            });

            books.forEach(
                await sleep(
                    async (book: any) => {
                        const {
                            isbn,
                            name,
                            author,
                            price,
                            cetegory,
                            publisher,
                            publishYear,
                            section
                        } = book;
                        const newBook = Book.build({
                            isbn,
                            name,
                            author,
                            price,
                            cetegory,
                            publisher,
                            publishYear,
                            section
                        });
                        newBook.library = library?.id;
                        library?.books?.push(newBook.id);
                        await library?.save();
                        await newBook.save();
                    }, 1000));

            return successHandler(res, 201, "Books Added Successfully...")

        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

export { router as deleteUserRouter }