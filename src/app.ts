import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import { providerRouter } from "./routes/provider/provider.routes";
import { categoryRouter } from "./routes/category/category.routes";
import { productRoutes } from "./routes/product/product.routes";

const app = express();

app.use(express.json())

app.use("/provider", providerRouter)
app.use("/category", categoryRouter)
app.use("/product", productRoutes)

app.use(handleErrorMiddleware);

export default app;
