import {
    errorHandler, ServerError, successHandler, validateRequest
} from "../middleware";
import {
    Router, Request, Response
} from "express";
import { sign } from "jsonwebtoken";
import { body } from "express-validator";
import { Auth } from "../models/Auth";
import { JWT_KEY } from "../config";

const router = Router();

router.post(
    "/api/auth/users/signup",
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        try {

            console.log(req.body);


            const { firstName, lastName, email, password, phoneNumber, address } = req.body;

            const existingUser = await Auth.findOne({ email });

            // console.log("existingUser", existingUser);

            if (existingUser) {
                return errorHandler(res, 200, 'This email already taken, please login.');
            };

            const [userName, _] = email.split("@");

            const user = Auth.build({
                firstName, lastName, userName, email, password, phoneNumber, address
            });
            await user.save();

            // Generate JWT
            const userJwt = sign(
                {
                    id: user.id,
                    email: user.email,
                },
                JWT_KEY
            );

            // Store it on session object
            req.session = {
                jwt: userJwt,
            };

            // res.status(200).send(existingUser);
            // console.log("Yes");

            // throw new RequestSuceess(res, 200, user);

            return successHandler(res, 201, userJwt);
        } catch (error) {
            throw errorHandler(res, 500, "Server erroe...");
        }
    }
);

export { router as signupUserRouter }