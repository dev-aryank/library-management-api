import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
    {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },

        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
            required: true
        },

        borrowedAt: {
            type: Date,
            default: Date.now
        },

        dueAt: {
            type: Date,
            default: () => Date.now() + 15 * 24 * 60 * 60 * 1000
        },

        returnedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;