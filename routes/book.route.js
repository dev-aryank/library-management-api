import { Router } from "express";
import bookController from "../controllers/book.controller.js";
import authenticate from "../middlewares/authentication.middleware.js";
import isAdmin from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/", authenticate, isAdmin, bookController.createBook);

router.get("/", authenticate, bookController.getAllBooks);

router.get("/:id", authenticate, bookController.getBookById);

router.patch("/:id", authenticate, isAdmin, bookController.updateBook);

router.delete("/:id", authenticate, isAdmin, bookController.deleteBook);

export default router;