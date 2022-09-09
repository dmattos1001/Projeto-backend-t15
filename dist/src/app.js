"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const handleError_middleware_1 = require("./middlewares/handleError.middleware");
const provider_routes_1 = require("./routes/provider/provider.routes");
const category_routes_1 = require("./routes/category/category.routes");
const product_routes_1 = require("./routes/product/product.routes");
const accessLog_routes_1 = __importDefault(require("./routes/accessLog/accessLog.routes"));
const session_routes_1 = __importDefault(require("./routes/session/session.routes"));
const productEntry_routes_1 = __importDefault(require("./routes/productEntry/productEntry.routes"));
const user_routes_1 = require("./routes/user/user.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/provider", provider_routes_1.providerRouter);
app.use("/users", user_routes_1.userRouter);
app.use("/accessLog", accessLog_routes_1.default);
app.use("/login", session_routes_1.default);
app.use("/productentry", productEntry_routes_1.default);
app.use("/category", category_routes_1.categoryRouter);
app.use("/product", product_routes_1.productRoutes);
app.use(handleError_middleware_1.handleErrorMiddleware);
exports.default = app;