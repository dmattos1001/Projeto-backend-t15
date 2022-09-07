import { Router } from "express";
import sessionCreateController from "../../controller/service/sessionCreate.Controller";

const sessionRouter = Router();
sessionRouter.post("", sessionCreateController);

export default sessionRouter;
