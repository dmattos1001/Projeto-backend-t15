"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneProduct = exports.listOneProduct = exports.listProducts = exports.createProduct = void 0;
const createProduct_service_1 = __importDefault(require("../../service/product/createProduct.service"));
const deleteProduct_service_1 = __importDefault(require("../../service/product/deleteProduct.service"));
const listOneProduct_service_1 = __importDefault(require("../../service/product/listOneProduct.service"));
const listProducts_service_1 = __importDefault(require("../../service/product/listProducts.service"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, value, saleValue, stock, criticalStock, provider, category } = req.body;
    const product = yield (0, createProduct_service_1.default)({ name, description, value, saleValue, stock, criticalStock, provider, category });
    return res.status(201).json(product);
});
exports.createProduct = createProduct;
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, listProducts_service_1.default)();
    return res.status(200).json(products);
});
exports.listProducts = listProducts;
const listOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield (0, listOneProduct_service_1.default)(id);
    return res.status(200).json(product);
});
exports.listOneProduct = listOneProduct;
const deleteOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, deleteProduct_service_1.default)(id);
    return res.status(200).json({ message: 'Product Deleted Success' });
});
exports.deleteOneProduct = deleteOneProduct;
