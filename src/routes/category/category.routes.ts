import { Router } from "express";
import {
  createCategory,
  listCategoryControllers,
  profileCategories,
} from "../../controller/category/category.controller";

export const categoryRouter = Router();

categoryRouter.post("", createCategory);
categoryRouter.get("", listCategoryControllers);
categoryRouter.get("/:id", profileCategories);
