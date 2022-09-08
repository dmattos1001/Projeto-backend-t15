"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerRouter = void 0;
const express_1 = require("express");
const providerPost_controller_1 = __importDefault(require("./../../controller/provider/providerPost.controller"));
const providerGet_controller_1 = __importDefault(require("./../../controller/provider/providerGet.controller"));
const providerGetId_controller_1 = __importDefault(require("./../../controller/provider/providerGetId.controller"));
const administrationNivelThree_middewars_1 = require("./../../middlewares/administrationNivelThree.middewars");
const tokenAuth_middleware_1 = require("../../middlewares/tokenAuth.middleware");
const administrationNivelOne_middewars_1 = __importDefault(require("../../middlewares/administrationNivelOne.middewars"));
exports.providerRouter = (0, express_1.Router)();
exports.providerRouter.post("", tokenAuth_middleware_1.tokenAuthMiddlewares, administrationNivelThree_middewars_1.administrationNivelThree, providerPost_controller_1.default);
exports.providerRouter.get("", tokenAuth_middleware_1.tokenAuthMiddlewares, administrationNivelOne_middewars_1.default, providerGet_controller_1.default);
exports.providerRouter.get("/:id", tokenAuth_middleware_1.tokenAuthMiddlewares, administrationNivelOne_middewars_1.default, providerGetId_controller_1.default);
