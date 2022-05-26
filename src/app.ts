import "dotenv/config"
import cors from "cors";
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError } from './middleware';
import { signinUserRouter } from './routers/signin';
import { signupUserRouter } from './routers/signup';
import { deleteUserRouter } from './routers/delete';
import { signoutUserRouter } from './routers/signout';
import { detailsUserRouter } from "./routers/details";
import { updateUserRouter } from './routers/updateUser';
import { getUserRouter } from "./routers/getUser";
import { getUsersRouter } from "./routers/getUsers";
import { getLibrariesRouter } from "./routers/getLibraries";
import { addLibraryRouter } from "./routers/addLibrary";
import { addBookRouter } from "./routers/addBook";
import { getBookRouter } from "./routers/getBook";
import { getBooksRouter } from "./routers/getBooks";
import { bookBorrowRouter } from "./routers/bookBorrow";
import { bookBuyRouter } from "./routers/bookBuy";
import { getPaymentsRouter } from "./routers/getPayments";

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(json());
app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== 'test',
        secure: false,
    })
);

// Routers
app.use(signinUserRouter);
app.use(signoutUserRouter);
app.use(signupUserRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);
app.use(detailsUserRouter);
app.use(getUserRouter);
app.use(getUsersRouter);
app.use(getLibrariesRouter);
app.use(addLibraryRouter);
app.use(addBookRouter);
app.use(getBookRouter);
app.use(getBooksRouter);
app.use(bookBorrowRouter);
app.use(bookBuyRouter);
app.use(getPaymentsRouter);


app.all('*', async (req, res) => {
    console.log("App error handaler for all request.");
    throw NotFoundError();
});

// app.use(errorHandler);

export { app };