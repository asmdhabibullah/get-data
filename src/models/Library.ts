import {
    model, Schema, Model, Document
} from "mongoose";


interface LibraryInterface {
    libraryName?: string;
    totalEarning?: number;
    totalExpence?: number;
    libraryLocation?: string;
    books?: Schema.Types.ObjectId[];
    libraryOwner?: Schema.Types.ObjectId;
    librarySfaff?: Schema.Types.ObjectId[];
}

export interface LibraryDoc extends Document {
    libraryName?: string;
    totalEarning?: number;
    totalExpence?: number;
    libraryLocation?: string;
    books?: Schema.Types.ObjectId[];
    libraryOwner?: Schema.Types.ObjectId;
    librarySfaff?: Schema.Types.ObjectId[];
}

interface UseLibraryInterface extends Model<LibraryDoc> {
    build(arrts: LibraryInterface): LibraryDoc;
};

// Auth app MongoDB schema for database fields
const LibrarySchema = new Schema(
    {
        libraryName: {
            trim: true,
            type: String,
            required: true
        },
        libraryLocation: {
            trim: true,
            type: String,
            required: true
        },
        libraryOwner: {
            ref: "Auth",
            type: Schema.Types.ObjectId
        },
        librarySfaff: [
            {
                ref: "Auth",
                type: Schema.Types.ObjectId
            }
        ],
        books: [
            {
                ref: "Book",
                type: Schema.Types.ObjectId
            }
        ],
        totalEarning: {
            type: Number,
        },
        totalExpence: {
            type: Number,
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
LibrarySchema.statics.build = (attrs: LibraryInterface) => {
    return new Library(attrs);
}

const Library = model<LibraryDoc, UseLibraryInterface>("Library", LibrarySchema);

export { Library }