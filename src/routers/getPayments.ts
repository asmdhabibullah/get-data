import {
    Router, Request, Response
} from "express";
import {
    errorHandler, successHandler
} from "../middleware";
import { Payment } from "../models/Payment";

const router = Router();

router.get(
    "/api/payments",
    async (req: Request, res: Response) => {
        try {
            const payments = await Payment.find({});
            // console.log(payments);

            if (payments && payments.length > 0) {
                return successHandler(res, 200, payments);
            } else {
                return errorHandler(res, 404, "User Not Found...");
            }
        } catch (error) {
            return errorHandler(res, 500, "Auth Database Error...");
        }
    });

export { router as getPaymentsRouter }