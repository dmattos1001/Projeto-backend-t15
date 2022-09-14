import { Router } from "express";
import createProductOrderController from "../../controller/productOrder/createProductOrder.Controller";
import listProductOrderController from "../../controller/productOrder/listProductOrder.Controller";
import profileProductOrderController from "../../controller/productOrder/profileProductOrder.controller";
import administrationNivelTwo from "../../middlewares/administrationNivelTwo.middewars";
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";
import productOrderSchema from "../../schema/productOrder.schema";
import validationMiddleware from "../../middlewares/validation.middleware";
import administrationNivelThree from "../../middlewares/administrationNivelThree.middewars";
import deleProductOrderController from "../../controller/productOrder/deleProductOrder.Controller";

const productOrderRouter = Router();
productOrderRouter.post(
  "",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  validationMiddleware(productOrderSchema),
  createProductOrderController
);
productOrderRouter.get(
  "",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  listProductOrderController
);
productOrderRouter.get(
  "/:id",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  profileProductOrderController
);
productOrderRouter.delete(
  "/:id",
  tokenAuthMiddlewares,
  administrationNivelThree,
  deleProductOrderController
);
export default productOrderRouter;
