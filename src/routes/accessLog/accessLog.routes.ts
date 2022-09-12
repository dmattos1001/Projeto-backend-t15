import { Router } from "express";
import accesLogListController from "../../controller/accessLog/acessLogList.controller";
import accesLogProfileController from "../../controller/accessLog/acessLogProfle.Controller";
import userAcessLogListController from "../../controller/accessLog/userAcessLogList.Controller";
import administrationNivelThree from "../../middlewares/administrationNivelThree.middewars";
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";

const accessLogRouter = Router();
accessLogRouter.get(
  "",
  tokenAuthMiddlewares,
  administrationNivelThree,
  accesLogListController
);
accessLogRouter.get(
  "/user/:id",
  tokenAuthMiddlewares,
  administrationNivelThree,
  userAcessLogListController
);
accessLogRouter.get(
  "/:id",
  tokenAuthMiddlewares,
  administrationNivelThree,
  accesLogProfileController
);

export default accessLogRouter;
