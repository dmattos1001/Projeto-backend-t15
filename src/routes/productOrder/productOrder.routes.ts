import { Router } from "express";
import createProductOrderController from "../../controller/productOrder/createProductOrder.Controller";
import listProductOrderController from "../../controller/productOrder/listProductOrder.Controller";
import profileProductOrderController from "../../controller/productOrder/profileProductOrder.controller";
import administrationNivelTwo from "../../middlewares/administrationNivelTwo.middewars";
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";

const productOrderRouter = Router();
productOrderRouter.post(
  "",
  tokenAuthMiddlewares,
  administrationNivelTwo,
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
export default productOrderRouter;
