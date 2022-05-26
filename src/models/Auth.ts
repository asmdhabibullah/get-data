import {
    model, Schema, Model, Document
} from "mongoose";
import { Password } from "../service/password";

// Account type
export enum AccountType {
    USER = "USER",
    GUEST = "GUEST",
    ADMIN = "ADMIN",
    STAFF = "STAFF",
};

interface AuthInterface {
    firstName: string;
    lastName: string;
    userName?: string;
    email: string;
    password: string;
    dateOfBirth?: Date;
    phoneNumber: string;
    address?: string;
    accountType?: AccountType;
    library?: Schema.Types.ObjectId;
    books?: Schema.Types.ObjectId[];
    reviews?: Schema.Types.ObjectId[];
    buys?: Schema.Types.ObjectId[];
    borrows?: Schema.Types.ObjectId[];
    payments?: Schema.Types.ObjectId[];
}

export interface AuthDoc extends Document {
    firstName: string;
    lastName: string;
    userName?: string;
    email: string;
    password: string;
    dateOfBirth?: Date;
    phoneNumber: string;
    address?: string;
    accountType?: AccountType;
    library?: Schema.Types.ObjectId;
    books?: Schema.Types.ObjectId[];
    reviews?: Schema.Types.ObjectId[];
    buys?: Schema.Types.ObjectId[];
    borrows?: Schema.Types.ObjectId[];
    payments?: Schema.Types.ObjectId[];
}

interface UseAuthInterface extends Model<AuthDoc> {
    build(arrts: AuthInterface): AuthDoc;
};

// Auth app MongoDB schema for database fields
const AuthSchema = new Schema(
    {
        firstName: {
            trim: true,
            type: String,
            required: true,
        },
        lastName: {
            trim: true,
            type: String,
            required: true,
        },
        userName: {
            trim: true,
            type: String
        },
        email: {
            trim: true,
            type: String,
            required: true,
        },
        dateOfBirth: {
            trim: true,
            type: Date,
        },
        phoneNumber: {
            trim: true,
            type: String,
            required: true,
        },
        password: {
            trim: true,
            type: String,
            required: true,
        },
        address: {
            trim: true,
            type: String,
        },
        accountType: {
            trim: true,
            type: String,
            enum: AccountType,
            default: AccountType.GUEST
        },
        library: {
            ref: "Library",
            type: Schema.Types.ObjectId
        },
        books: [
            {
                ref: "Book",
                type: Schema.Types.ObjectId
            }
        ],
        reviews: [
            {
                ref: "BookReview",
                type: Schema.Types.ObjectId
            }
        ],
        buys: [
            {
                ref: "BorrowOrBuy",
                type: Schema.Types.ObjectId
            }
        ],
        borrows: [
            {
                ref: "BorrowOrBuy",
                type: Schema.Types.ObjectId
            }
        ],
        payments: [
            {
                ref: "Payment",
                type: Schema.Types.ObjectId
            }
        ],
        totalSpend: {
            type: Number,
            default: 0
        }
    }
);

AuthSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// Better way to approch
AuthSchema.statics.build = (attrs: AuthInterface) => {
    return new Auth(attrs);
}

const Auth = model<AuthDoc, UseAuthInterface>("Auth", AuthSchema);

export { Auth }