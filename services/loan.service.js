import Book from "../models/book.model.js";
import Loan from "../models/loan.model.js";
import AppError from "../utils/AppError.js";

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

const loanService = {createLoan};
export default loanService;
