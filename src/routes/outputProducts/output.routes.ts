import { Router } from "express";
import outputProductPostController from './../../controller/outputProduct/outputProductPost.controller';
import outputProductGetController from './../../controller/outputProduct/outputProductGet.controller';
import outputProductGetIdController from "../../controller/outputProduct/outputProductGetId.controller";
import administrationNivelThree from "../../middlewares/administrationNivelThree.middewars";
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";
import administrationNivelTwo from "../../middlewares/administrationNivelOne.middewars";

export const outputProductsRouter = Router()

outputProductsRouter.post("",tokenAuthMiddlewares,administrationNivelThree,outputProductPostController)
outputProductsRouter.get("",tokenAuthMiddlewares,administrationNivelTwo,outputProductGetController)
outputProductsRouter.get("/:id",tokenAuthMiddlewares,administrationNivelTwo ,outputProductGetIdController)