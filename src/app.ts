import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { providerRouter } from "./routes/provider/provider.routes";

import accessLogRouter from "./routes/accessLog/accessLog.routes";
import sessionRouter from "./routes/session/session.routes";

import productEntryRouter from "./routes/productEntry/productEntry.routes";


const app = express();

app.use(express.json());

app.use("/provider", providerRouter);
app.use("/accessLog", accessLogRouter);
app.use("/login", sessionRouter);
app.use("/productentry", productEntryRouter);


app.use(handleErrorMiddleware);

export default app;
