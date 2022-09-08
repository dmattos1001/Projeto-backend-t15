"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputProductsRouter = void 0;
const express_1 = require("express");
const outputProductPost_controller_1 = __importDefault(require("./../../controller/outputProduct/outputProductPost.controller"));
const outputProductGet_controller_1 = __importDefault(require("./../../controller/outputProduct/outputProductGet.controller"));
const outputProductGetId_controller_1 = __importDefault(require("../../controller/outputProduct/outputProductGetId.controller"));
const administrationNivelThree_middewars_1 = __importDefault(require("../../middlewares/administrationNivelThree.middewars"));
const tokenAuth_middleware_1 = require("../../middlewares/tokenAuth.middleware");
const administrationNivelOne_middewars_1 = __importDefault(require("../../middlewares/administrationNivelOne.middewars"));
exports.outputProductsRouter = (0, express_1.Router)();
exports.outputProductsRouter.post("", tokenAuth_middleware_1.tokenAuthMiddlewares, administrationNivelThree_middewars_1.default, outputProductPost_controller_1.default);
exports.outputProductsRouter.get("", tokenAuth_middleware_1.tokenAuthMiddlewares, administrationNivelOne_middewars_1.default, outputProductGet_controller_1.default);
exports.outputProductsRouter.get("/:id", tokenAuth_middleware_1.tokenAuthMiddlewares, administrationNivelOne_middewars_1.default, outputProductGetId_controller_1.default);
