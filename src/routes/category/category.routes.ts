import { Router } from "express";
import { createCategory, listCategories } from "../../controller/category/category.controller";


export const categoryRouter = Router();

categoryRouter.post("", createCategory);
categoryRouter.get("/:id", listCategories);

