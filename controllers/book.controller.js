import bookService from "../services/book.service.js"

async function createBook(req, res) {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
}

async function getAllBooks(req, res){
    const books = await bookService.getAllBooks();
    res.json(books);
}

async function getBookById(req, res) {
    const book = await bookService.getBookById(req.params.id);
    res.json(book);
}

async function updateBook(req, res) {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.json(book);
}

async function deleteBook(req, res) {
    const book = await bookService.deleteBook(req.params.id);
    res.json(book);    
}

const bookController = {createBook, getAllBooks, getBookById, updateBook, deleteBook};
export default bookController;