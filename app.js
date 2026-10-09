import express from "express";

import authRouter from "./routes/auth.route.js";
import bookRouter from "./routes/book.route.js";
import memberRouter from "./routes/member.route.js";
import loanRouter from "./routes/loan.route.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);
app.use("/api/members", memberRouter);
app.use("/api/loans", loanRouter);

app.use(errorHandler);

export default app;