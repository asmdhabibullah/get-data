import {
    Router, Request, Response
} from "express";

import {
    errorHandler, successHandler, validateRequest
} from "../middleware";
import { Auth } from "../models/Auth";
import { Book } from "../models/Book";
import { Payment } from "../models/Payment";

const router = Router();

router.post(
    "/api/book/buy",
    async (req: Request, res: Response) => {
        try {
            // cosnt { am} 
            const query = req.query;

            console.log(query);

            const { bookId, email } = query;

            const {
                card_no, name, exp_date, cvc, price
            } = req.body;

            // 4865391572038106
            // 4865395830033494

            const user = await Auth.findOne({ email });
            const book = await Book.findOne({ _id: bookId });

            if (user && book && card_no === "4865395830033494" && cvc === "645") {

                user?.buys?.push(book?.id);
                book!.user = user?.id;

                const date = new Date();

                const payment = Payment.build({
                    user: user?.id,
                    amount: price,
                    paymentInfo: {
                        type: "Buy",
                        card: card_no,
                        carHolder: name,
                        cardExpireDate: exp_date,
                        cardType: "Visa",
                        issueDate: date
                    }
                });
                if (payment) {
                    await user!.save();
                    await book!.save();
                    await payment.save();
                    return successHandler(res, 201, "You Bought This Book Successfully...")
                } else {
                    return errorHandler(res, 404, "User/Book not Found...");
                }
            } else {
                return errorHandler(res, 404, "Card Information Invalide...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Book Database Error...");
        }
    });

export { router as bookBuyRouter }