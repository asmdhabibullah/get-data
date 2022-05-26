import {
    model, Schema, Model, Document
} from "mongoose";

interface BookInterface {
    isbn: string;
    name: string;
    author: string;
    price?: number;
    cetegory: string;
    publisher: string;
    publishYear: Date;
    section?: string;
    imgUri?: string;
    longDescription?: string;
    shortDescription?: string;
    user?: Schema.Types.ObjectId;
    reviews?: Schema.Types.ObjectId[];
    library?: Schema.Types.ObjectId;
    borrowOrBuy?: Schema.Types.ObjectId[];
}

export interface BookDoc extends Document {
    isbn: string;
    name: string;
    author: string;
    price?: number;
    cetegory: string;
    publisher: string;
    publishYear: Date;
    imgUri?: string;
    section?: string;
    longDescription?: string;
    shortDescription?: string;
    user?: Schema.Types.ObjectId;
    reviews?: Schema.Types.ObjectId[];
    library?: Schema.Types.ObjectId;
    borrowOrBuy?: Schema.Types.ObjectId[];
}

interface UseBookInterface extends Model<BookDoc> {
    build(arrts: BookInterface): BookDoc;
};

// Auth app MongoDB schema for database fields
const BookSchema = new Schema(
    {
        isbn: {
            trim: true,
            type: String,
            required: true
        },
        name: {
            trim: true,
            type: String,
            required: true
        },
        price: {
            trim: true,
            type: Number,
            required: true
        },
        author: {
            trim: true,
            type: String,
            required: true
        },
        publisher: {
            trim: true,
            type: String,
            required: true
        },
        cetegory: {
            trim: true,
            type: String,
            required: true
        },
        publishYear: {
            trim: true,
            type: Date,
            required: true
        },
        availability: {
            type: Boolean,
            default: true
        },
        section: {
            trim: true,
            type: String,
        },
        imgUri: {
            trim: true,
            type: String,
        },
        longDescription: {
            trim: true,
            type: String,
        },
        shortDescription: {
            trim: true,
            type: String,
        },
        user: {
            ref: "Auth",
            type: Schema.Types.ObjectId
        },
        library: {
            ref: "Library",
            type: Schema.Types.ObjectId
        },
        reviews: [
            {
                ref: "BookReview",
                type: Schema.Types.ObjectId
            }
        ],
        borrowOrBuy: [
            {
                ref: "BorrowOrBuy",
                type: Schema.Types.ObjectId
            }
        ]
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
BookSchema.statics.build = (attrs: BookInterface) => {
    return new Book(attrs);
}

const Book = model<BookDoc, UseBookInterface>("Book", BookSchema);

export { Book }