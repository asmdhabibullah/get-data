import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Auth } from "../models/Auth";
import { Book } from "../models/Book";
import { Payment } from "../models/Payment";

const router = Router();

router.post(
    "/api/book/borrow",
    async (req: Request, res: Response) => {
        try {
            const { bookId, email } = req.query;
            // console.log("req.query", req.query);

            const {
                card_no, name, exp_date, cvc, price
            } = req.body;

            const user = await Auth.findOne({ email });
            const book = await Book.findOne({ _id: bookId }).populate("library");

            if (user && book && card_no === "4865395830033494" && cvc === "645") {

                user?.buys?.push(book?.id);
                book!.user = user?.id;

                const date = new Date();

                const payment = Payment.build({
                    user: user?.id,
                    amount: price,
                    paymentInfo: {
                        type: "Borrow",
                        card: card_no,
                        carHolder: name,
                        cardExpireDate: exp_date,
                        cardType: "Visa",
                        issueDate: date,
                        rentPeriod: "14 days",
                        returnDate: new Date(date.getDate() + 14),
                    }
                });
                if (payment) {
                    await user!.save();
                    await book!.save();
                    await payment.save();
                    return successHandler(res, 201, "You Borrowed This Book Successfully...")
                } else {
                    return errorHandler(res, 404, "User/Book not Found...");
                }

            } else {
                return errorHandler(res, 404, "Card Information Invalide...");
            }

        } catch (error) {
            return errorHandler(res, 500, "Auth server error...");
        }
    });

export { router as bookBorrowRouter }