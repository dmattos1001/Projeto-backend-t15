"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createProductEntry_controller_1 = __importDefault(require("../../controller/productEntry/createProductEntry.controller"));
const listOneProductEntry_controller_1 = __importDefault(require("../../controller/productEntry/listOneProductEntry.controller"));
const listProductEntries_controller_1 = __importDefault(require("../../controller/productEntry/listProductEntries.controller"));
const productEntryRouter = (0, express_1.Router)();
productEntryRouter.post("", createProductEntry_controller_1.default);
productEntryRouter.get("", listProductEntries_controller_1.default);
productEntryRouter.get("/:id", listOneProductEntry_controller_1.default);
exports.default = productEntryRouter;
