import {
    model, Schema, Model, Document
} from "mongoose";

interface BookReviewInterface {
    point?: string;
    review: string;
    user: Schema.Types.ObjectId;
    book?: Schema.Types.ObjectId;
}

export interface BookReviewDoc extends Document {
    point?: string;
    review: string;
    user: Schema.Types.ObjectId;
    book?: Schema.Types.ObjectId;
}

interface UseBookReviewInterface extends Model<BookReviewDoc> {
    build(arrts: BookReviewInterface): BookReviewDoc;
};

// Auth app MongoDB schema for database fields
const BookReviewSchema = new Schema(
    {
        review: {
            trim: true,
            type: String
        },
        point: {
            trim: true,
            type: Number,
            default: 5
        },
        user: {
            ref: "Auth",
            type: Schema.Types.ObjectId
        },
        book: {
            ref: "Book",
            type: Schema.Types.ObjectId
        },
    },
    // {
    //     toJSON: {
    //         transform(doc, ret) {
    //             ret.id = ret._id;
    //             delete ret._id;
    //             delete ret.password;
    //             delete ret.__v;
    //         }
    //     }
    // }
);

// Better way to approch
BookReviewSchema.statics.build = (attrs: BookReviewInterface) => {
    return new BookReview(attrs);
}

const BookReview = model<BookReviewDoc, UseBookReviewInterface>("BookReview", BookReviewSchema);

export { BookReview }