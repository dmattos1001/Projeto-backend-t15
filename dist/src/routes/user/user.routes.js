"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const createUser_controller_1 = __importDefault(require("../../controller/user/createUser.controller"));
const listUserById_controller_1 = __importDefault(require("../../controller/user/listUserById.controller"));
const listUser_controller_1 = __importDefault(require("../../controller/user/listUser.controller"));
const updateUser_controller_1 = __importDefault(require("../../controller/user/updateUser.controller"));
const deleteUser_controller_1 = __importDefault(require("../../controller/user/deleteUser.controller"));
const administrationNivelThree_middewars_1 = __importDefault(require("../../middlewares/administrationNivelThree.middewars"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("", createUser_controller_1.default);
exports.userRouter.get("", administrationNivelThree_middewars_1.default, listUser_controller_1.default);
exports.userRouter.get("/:id", administrationNivelThree_middewars_1.default, listUserById_controller_1.default);
exports.userRouter.patch("/:id", administrationNivelThree_middewars_1.default, updateUser_controller_1.default);
exports.userRouter.delete("/:id", administrationNivelThree_middewars_1.default, deleteUser_controller_1.default);
