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
exports.providerRouter = (0, express_1.Router)();
exports.providerRouter.post("", providerPost_controller_1.default);
exports.providerRouter.get("", providerGet_controller_1.default);
exports.providerRouter.get("/:id", providerGetId_controller_1.default);
