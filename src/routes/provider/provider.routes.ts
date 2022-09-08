import { Router } from "express";
import providerPostController from "./../../controller/provider/providerPost.controller";
import providerGetController from "./../../controller/provider/providerGet.controller";
import providerGetIdController from "./../../controller/provider/providerGetId.controller";
import { administrationNivelThree } from './../../middlewares/administrationNivelThree.middewars';
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";
import administrationNivelTwo from "../../middlewares/administrationNivelOne.middewars";

export const providerRouter = Router();

providerRouter.post("",tokenAuthMiddlewares ,administrationNivelThree,providerPostController);
providerRouter.get("", tokenAuthMiddlewares,administrationNivelTwo,providerGetController);
providerRouter.get("/:id",tokenAuthMiddlewares, administrationNivelTwo,providerGetIdController);
