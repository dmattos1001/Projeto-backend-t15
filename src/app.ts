import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { providerRouter } from "./routes/provider/provider.routes";

const app = express();

app.use("/provider",providerRouter)

app.use(handleErrorMiddleware);
export default app;
