import { Router } from "express";
import createUserController from "../../controller/user/createUser.controller";
import listUserByIdController from "../../controller/user/listUserById.controller";
import listUserController from "../../controller/user/listUser.controller";
import updateUserController from "../../controller/user/updateUser.controller";
import deleteUserController from "../../controller/user/deleteUser.controller";
import administrationNivelThree from "../../middlewares/administrationNivelThree.middewars";
import { tokenAuthMiddlewares } from "../../middlewares/tokenAuth.middleware";

export const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", tokenAuthMiddlewares, administrationNivelThree, listUserController);
userRouter.get("/:id", administrationNivelThree, listUserByIdController);
userRouter.patch("/:id", administrationNivelThree, updateUserController);
userRouter.delete("/:id", tokenAuthMiddlewares, administrationNivelThree, deleteUserController);
