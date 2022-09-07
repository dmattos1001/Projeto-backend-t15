import { Router } from "express";
import accesLogListController from "../../controller/accessLog/acessLogList.controller";
import accesLogProfileController from "../../controller/accessLog/acessLogProfle.Controller";

const accessLogRouter = Router();
accessLogRouter.get("", accesLogListController);
accessLogRouter.get("/:id", accesLogProfileController);

export default accessLogRouter;
