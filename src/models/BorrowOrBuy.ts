import {
    model, Schema, Model, Document
} from "mongoose";

interface BorrowOrBuyInterface {
    fine?: number;
    rentDate?: Date;
    rentFee?: number;
    bookPrice?: number;
    oparationType?: string;
    book?: Schema.Types.ObjectId;
}

interface BorrowOrBuyDoc extends Document {
    fine?: number;
    rentDate?: Date;
    rentFee?: number;
    bookPrice?: number;
    oparationType?: string;
    book?: Schema.Types.ObjectId;
}

interface UseBorrowOrBuyInterface extends Model<BorrowOrBuyDoc> {
    build(arrts: BorrowOrBuyInterface): BorrowOrBuyDoc;
};

// Auth app MongoDB schema for database fields
const BorrowOrBuySchema = new Schema(
    {
        fine: {
            trim: true,
            type: Number,
            required: true
        },
        date: {
            trim: true,
            type: Date,
            required: true
        },
        fee: {
            trim: true,
            type: Number,
            required: true
        },
        price: {
            trim: true,
            type: Number,
            required: true
        },
        oparationType: {
            trim: true,
            type: String,
            required: true
        },
        user: {
            ref: "Auth",
            type: Schema.Types.ObjectId
        },
        book: {
            ref: "Book",
            type: Schema.Types.ObjectId
        }
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
BorrowOrBuySchema.statics.build = (attrs: BorrowOrBuyInterface) => {
    return new BorrowOrBuy(attrs);
}

const BorrowOrBuy = model<BorrowOrBuyDoc, UseBorrowOrBuyInterface>("BorrowOrBuy", BorrowOrBuySchema);

export { BorrowOrBuy }