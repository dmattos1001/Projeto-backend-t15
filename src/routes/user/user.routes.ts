import { Router } from "express";
import createUserController from "../../controller/user/createUser.controller";
import listUserByIdController from "../../controller/user/listUserById.controller";
import listUserController from "../../controller/user/listUser.controller";

export const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", listUserController);
userRouter.get("/:id", listUserByIdController);
