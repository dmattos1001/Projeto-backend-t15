import { Router } from "express";
import {
  createCategory,
  listCategoryControllers,
  profileCategories,
} from "../../controller/category/category.controller";
import administrationNivelThree from "../../middlewares/administrationNivelThree.middewars";
import administrationNivelTwo from "../../middlewares/administrationNivelTwo.middewars";
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { categorySchema } from "../../schema/category.schema";

export const categoryRouter = Router();

categoryRouter.post(
  "",
  tokenAuthMiddlewares,
  administrationNivelThree,
  validationMiddleware(categorySchema),
  createCategory
);
categoryRouter.get(
  "",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  listCategoryControllers
);
categoryRouter.get(
  "/:id",
  tokenAuthMiddlewares,
  administrationNivelTwo,
  profileCategories
);
