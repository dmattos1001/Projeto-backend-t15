import { Router } from "express";
import outputProductPostController from './../../controller/outputProduct/outputProductPost.controller';
import outputProductGetController from './../../controller/outputProduct/outputProductGet.controller';
import outputProductGetIdController from "../../controller/outputProduct/outputProductGetId.controller";

export const outputProductsRouter = Router()

outputProductsRouter.post("", outputProductPostController)
outputProductsRouter.get("", outputProductGetController)
outputProductsRouter.get("/:id", outputProductGetIdController)