import { Router } from "express";
import createProductEntryController from "../../controller/productEntry/createProductEntry.controller";
import listOneProductEntryController from "../../controller/productEntry/listOneProductEntry.controller";
import listProductEntriesController from "../../controller/productEntry/listProductEntries.controller";
import administrationNivelThree from "../../middlewares/administrationNivelThree.middewars";
import administrationNivelTwo from "../../middlewares/administrationNivelTwo.middewars";
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { productEntrySchema } from "../../schema/productEntry.schema";

const productEntryRouter = Router();

productEntryRouter.post(
  "",
  tokenAuthMiddlewares,
  administrationNivelThree,
  validationMiddleware(productEntrySchema),
  createProductEntryController
);

productEntryRouter.get(
  "",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  listProductEntriesController
);

productEntryRouter.get(
  "/:id",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  listOneProductEntryController
);

export default productEntryRouter;
