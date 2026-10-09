import { Router } from "express";
import authenticate from "../middlewares/authentication.middleware.js";
import loanController from "../controllers/loan.controller.js";
const router = Router();

router.post("/", authenticate, loanController.createLoan);

export default router;