"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionCreate_Controller_1 = __importDefault(require("../../controller/service/sessionCreate.Controller"));
const sessionRouter = (0, express_1.Router)();
sessionRouter.post("", sessionCreate_Controller_1.default);
exports.default = sessionRouter;
