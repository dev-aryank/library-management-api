import express from "express";

import bookRouter from "./routes/book.route.js";
import memberRouter from "./routes/member.route.js"
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/member", )

app.use(errorHandler);

export default app;