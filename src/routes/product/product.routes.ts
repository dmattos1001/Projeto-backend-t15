import { Router } from "express";
import {
  createProduct,
  deleteOneProduct,
  listOneProduct,
  listProducts,
} from "../../controller/product/product.controller";
import administrationNivelThree from "../../middlewares/administrationNivelThree.middewars";
import administrationNivelTwo from "../../middlewares/administrationNivelTwo.middewars";
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { productSchema } from "../../schema/product.schema";

export const productRoutes = Router();

productRoutes.post(
  "",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  validationMiddleware(productSchema),
  createProduct
);
productRoutes.get(
  "",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  listProducts
);
productRoutes.get(
  "/:id",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  listOneProduct
);
productRoutes.delete(
  "/:id",
  tokenAuthMiddlewares,
  administrationNivelThree,
  deleteOneProduct
);
