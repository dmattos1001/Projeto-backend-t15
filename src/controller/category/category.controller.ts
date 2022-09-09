import { Request, Response } from "express";
import createCategorieService from "../../service/category/createCategory.service";
import listCategoryService from "../../service/category/listCategory.service";
import ProfileCategoryProduct from "../../service/category/profileCategoryProduct.service";

const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = await createCategorieService({ name, description });

  return res.status(201).json(category);
};
const listCategoryControllers = async (req: Request, res: Response) => {
  const category = await listCategoryService();

  return res.status(200).json(category);
};
const profileCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await ProfileCategoryProduct(id);

  return res.status(200).json(products);
};

export { createCategory, profileCategories, listCategoryControllers };
