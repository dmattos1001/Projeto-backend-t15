import { Request, Response } from "express";
import createProductService from "../../service/product/createProduct.service";
import deleteOneProductService from "../../service/product/deleteProduct.service";
import listCriticalStockProductService from "../../service/product/listCriticalStockProduct.service";
import listOneProductsService from "../../service/product/listOneProduct.service";
import listProductsService from "../../service/product/listProducts.service";

const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    value,
    saleValue,
    stock,
    criticalStock,
    provider,
    category,
  } = req.body;

  const product = await createProductService({
    name,
    description,
    value,
    saleValue,
    stock,
    criticalStock,
    provider,
    category,
  });

  return res.status(201).json(product);
};

const listProducts = async (req: Request, res: Response) => {
  const products = await listProductsService();

  return res.status(200).json(products);
};

const listOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await listOneProductsService(id);

  return res.status(200).json(product);
};

const deleteOneProduct = async (req: Request, res: Response) => {

  const { id } = req.params;
  const email = req.user.emailAdm;
  const product = await deleteOneProductService(id, email);

  return res.status(200).json({ message: product });
};
const listCriticalStockProduct = async (req: Request, res: Response) => {
  const product = await listCriticalStockProductService();
  return res.status(200).json(product);
};
export {
  createProduct,
  listProducts,
  listOneProduct,
  deleteOneProduct,
  listCriticalStockProduct,
};

