import { Router } from "express";
import authenticate from "../middlewares/authentication.middleware.js";
import loanController from "../controllers/loan.controller.js";
const router = Router();

router.post("/", authenticate, loanController.createLoan);
router.get("/me", authenticate, loanController.getMyLoans);
router.patch("/:loanId/return", authenticate, loanController.returnLoan);

export default router;