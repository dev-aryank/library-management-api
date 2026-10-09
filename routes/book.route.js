import { Router } from "express";
import bookController from "../controllers/book.controller.js";

const router = Router();

router.post("/", bookController.createBook);

router.get("/", bookController.getAllBooks);

router.get("/:id", bookController.getBookById);

router.patch("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

export default router;