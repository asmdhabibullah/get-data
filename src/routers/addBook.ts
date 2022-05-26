import {
    Router, Request, Response
} from "express";
import {
    body
} from "express-validator";
import {
    errorHandler, successHandler, validateRequest
} from "../middleware";
import { Book } from "../models/Book";
import { Library } from "../models/Library";

const router = Router();

router.post(
    "/api/book/add/:libraryId",
    [
        body('isbn').isString().withMessage('Data must be provide'),
        body('name').isString().withMessage('Data must be provide'),
        body('author').isString().withMessage('Data must be provide'),
        body('price').isNumeric().withMessage('Data must be provide'),
        body('cetegory').isString().withMessage('Data must be provide'),
        body('publisher').isString().withMessage('Data must be provide'),
        body('publishYear').isString().withMessage('Data must be provide'),
        body('section').isString().withMessage('Data must be provide'),
        body('imgUri').isString().withMessage('Data must be provide')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {
            const {
                isbn,
                name,
                author,
                price,
                cetegory,
                publisher,
                publishYear,
                section,
                imgUri,
                longDescription,
                shortDescription
            } = req.body;

            const { libraryId } = req.params;

            const library = await Library.findOne({ id: libraryId })

            const newBook = Book.build({
                isbn,
                name,
                author,
                price,
                cetegory,
                publisher,
                publishYear,
                section,
                imgUri,
                longDescription,
                shortDescription
            });
            library?.books?.push(newBook.id);
            newBook.library = library?.id;

            await library?.save();
            await newBook.save();

            return successHandler(res, 201, "Book Added Successfully...")

        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

export { router as addBookRouter }