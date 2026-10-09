import { Router } from "express";
import bookController from "../controllers/book.controller.js";
import validate from "../middlewares/validate.middleware.js";
import bookValidation from "../validations/book.validation.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", validate(bookValidation.createBook), bookController.createBook);

router.get("/", authenticate, bookController.getAllBooks);

router.get("/:id", validate(bookValidation.bookId, "params"), bookController.getBookById);

router.patch(
    "/:id",
    validate(bookValidation.bookId, "params"),
    validate(bookValidation.updateBook),
    bookController.updateBook
);

router.delete("/:id", validate(bookValidation.bookId, "params"), bookController.deleteBook);

export default router;