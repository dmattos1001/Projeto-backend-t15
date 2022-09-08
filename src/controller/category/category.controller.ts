import { Request, Response } from "express";
import createCategorieService from "../../service/category/createCategory.service";
import listCategoryProduct from "../../service/category/listCategoryProduct.service";

const createCategory = async (req: Request, res: Response) => {

    const { name, description } = req.body;

    const category = await createCategorieService({ name, description });

    return res.status(201).json(category);

}

const listCategories = async (req: Request, res: Response) => {

    const { id } = req.params;

    const products = await listCategoryProduct(id);

    return res.status(200).json(products);

}

export { createCategory, listCategories }