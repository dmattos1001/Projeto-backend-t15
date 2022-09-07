import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { providerRouter } from "./routes/provider/provider.routes";
import { outputProductsRouter } from './routes/outputProducts/output.routes';

const app = express();

app.use(express.json())

app.use("/provider",providerRouter)
app.use("/outputsProducts",outputProductsRouter)

app.use(handleErrorMiddleware);

export default app;
