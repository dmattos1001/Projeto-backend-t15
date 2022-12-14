"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("../../controller/product/product.controller");
exports.productRoutes = (0, express_1.Router)();
exports.productRoutes.post("", product_controller_1.createProduct);
exports.productRoutes.get("", product_controller_1.listProducts);
exports.productRoutes.get("/:id", product_controller_1.listOneProduct);
exports.productRoutes.delete("/:id", product_controller_1.deleteOneProduct);
