import { Router } from "express";
import { createProduct, deleteOneProduct, listOneProduct, listProducts } from "../../controller/product/product.controller";


export const productRoutes = Router();

productRoutes.post("", createProduct);
productRoutes.get("", listProducts);
productRoutes.get("/:id", listOneProduct);
productRoutes.delete("/:id", deleteOneProduct);

