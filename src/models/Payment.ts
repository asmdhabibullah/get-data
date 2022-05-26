import {
    model, Schema, Model, Document
} from "mongoose";

interface PaymentInterface {
    user: string;
    amount: number;
    paymentInfo?: object;
}

export interface PaymentDoc extends Document {
    user: string;
    amount: number;
    paymentInfo?: object;
}

interface UsePaymentInterface extends Model<PaymentDoc> {
    build(arrts: PaymentInterface): PaymentDoc;
};

// Auth app MongoDB schema for database fields
const PaymentSchema = new Schema(
    {
        user: {
            ref: "Auth",
            type: Schema.Types.ObjectId
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentInfo: {
            trim: true,
            type: Object,
            required: false
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
PaymentSchema.statics.build = (attrs: PaymentInterface) => {
    return new Payment(attrs);
}

const Payment = model<PaymentDoc, UsePaymentInterface>("Payment", PaymentSchema);

export { Payment }