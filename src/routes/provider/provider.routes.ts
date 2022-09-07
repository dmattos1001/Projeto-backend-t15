import { Router } from "express";
import providerPostController from "./../../controller/provider/providerPost.controller";
import providerGetController from "./../../controller/provider/providerGet.controller";
import providerGetIdController from "./../../controller/provider/providerGetId.controller";

export const providerRouter = Router();

providerRouter.post("", providerPostController);
providerRouter.get("", providerGetController);
providerRouter.get("/:id", providerGetIdController);
