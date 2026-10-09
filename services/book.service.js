import Book from "../models/book.model.js";
import AppError from "../utils/AppError.js";

async function createBook(bookData){
    const book = await Book.create({
        ...bookData,
        availableCopies: bookData.totalCopies
    });
    return book;
}

async function getAllBooks() {
    const books = await Book.find({isActive: true});
    return books;
}

async function getBookById(bookId) {
    const book = await Book.findById(bookId)
                            .select("-createdAt -updatedAt -__v -isActive");
    if(!book) throw new AppError("Book not found", 404);
    return book;
}

async function updateBook(bookId, bookData) {

    const existingBook = await Book.findOne({
        _id: bookId,
        isActive: true
    });

    if (!existingBook) {
        throw new AppError("Book not found", 404);
    }

    delete bookData.availableCopies;
    delete bookData.isActive;

    if (bookData.totalCopies !== undefined) {

        const borrowedCopies =
            existingBook.totalCopies - existingBook.availableCopies;

        if (bookData.totalCopies < borrowedCopies) {
            throw new AppError(
                `Cannot reduce total copies below ${borrowedCopies} because ${borrowedCopies} copies are currently borrowed`,
                400
            );
        }

        bookData.availableCopies =
            bookData.totalCopies - borrowedCopies;
    }


    const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        bookData,
        {
            new: true,
            runValidators: true
        }
    ).select("-createdAt -updatedAt -__v -isActive");

    return updatedBook;
}

async function deleteBook(bookId) {
    const book = await Book.findOneAndUpdate(
                                {
                                    _id: bookId,
                                    isActive: true
                                },
                                {
                                    isActive: false
                                },
                                {
                                    new: true
                                }
                            )
                            .select("-createdAt -updatedAt -__v -isActive");
    if (!book) {
        throw new AppError("Book not found", 404);
    }
    return book;
}

const bookService = {createBook, getAllBooks, getBookById, updateBook, deleteBook};
export default bookService;