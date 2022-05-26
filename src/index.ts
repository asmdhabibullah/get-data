import { app } from './app';
import { connect } from "mongoose";
import { PORT } from './config';

const dbConnect = async () => {
    try {
        const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/librarydb";
        await connect(DB_URI);
        console.log("App database connected successfully");
    } catch (error) {
        console.log(error);
    }
};

app.listen(PORT, () => {
    console.log(`Server app runing on http://localhost:${PORT}`);
});

dbConnect();
