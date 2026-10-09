import Book from "../models/book.model.js";
import Loan from "../models/loan.model.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";

async function createLoan(userId, bookId) {
    if (!bookId) {
        throw new AppError("Book ID is required", 400);
    }

    const book = await Book.findById(bookId);
    if(!book) throw new AppError("Book not found", 404);

    const availability = book.availableCopies;
    if(availability < 1) throw new AppError("No copies of this book are currently available", 409);

    book.availableCopies -= 1;
    await book.save();

    // const loan = {book: bookId, member: userId};
    const loan = await Loan.create({book: bookId, member: userId});

    await loan.populate([
                        {
                            path: "book",
                            select: "title author isbn -_id"
                        },
                        {
                            path: "member",
                            select: "name email -_id"
                        }
                    ]);
    

    return loan;
}

async function getMyLoans(userId, status) {

    const match = {member: new mongoose.Types.ObjectId(userId)};
    if(status === "active"){
        match.returnedAt = null;
    }
    else if(status === "returned"){
        match.returnedAt = {$ne: null};
    }

    const loans = Loan.aggregate([
        {
            $match: match
        },
        {
            $lookup: {
                from: "books",
                localField: "book",
                foreignField: "_id",
                as: "Books"
            }
        },
        {
            $unwind: "$Books"
        },
        {
            $project: {
                _id: 1,
                "Books.title": 1,
                "Books.author": 1,
                "Books.isbn": 1,
                borrowedAt: 1,
                dueAt: 1,
                returnedAt: 1
            }
        },
        {
            $sort: {
                borrowedAt: -1
            }
        }
    ]);
    return loans;
}

async function returnLoan(userId, loanId) {
    const loan = await Loan.findById(loanId);
    if(!loan) throw new AppError("Loan doesnt exists", 404);

    if(loan.member.toString() !== userId) throw new AppError("You dont own the loan", 403);

    if(loan.returnedAt !== null) throw new AppError("Loan is already settled", 409);

    loan.returnedAt = Date.now();

    await loan.save();

    const book = await Book.findById(loan.book);
    book.availableCopies += 1;
    await book.save();

    await loan.populate([
                        {
                            path: "book",
                            select: "title author isbn -_id"
                        },
                        {
                            path: "member",
                            select: "name email -_id"
                        }
                    ]);
    

    return loan;
}

const loanService = {createLoan, getMyLoans, returnLoan};
export default loanService;
