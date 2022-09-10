"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const acessLogList_controller_1 = __importDefault(require("../../controller/accessLog/acessLogList.controller"));
const acessLogProfle_Controller_1 = __importDefault(require("../../controller/accessLog/acessLogProfle.Controller"));
const accessLogRouter = (0, express_1.Router)();
accessLogRouter.get("", acessLogList_controller_1.default);
accessLogRouter.get("/:id", acessLogProfle_Controller_1.default);
exports.default = accessLogRouter;
