import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        isbn: {
            type: String,
            required: true,
            unique: true,
            set: (value) => value.replace(/[\s-]/g, "").toUpperCase(),
            match: [/^(?:\d{9}[\dX]|\d{13})$/, "ISBN must be a 10- or 13-character ISBN"]
        },
        genre: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        totalCopies: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: "totalCopies must be an integer"
            }
        },
        availableCopies: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: "availableCopies must be an integer"
            }
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
