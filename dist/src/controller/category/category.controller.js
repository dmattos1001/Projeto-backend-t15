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
exports.listCategories = exports.createCategory = void 0;
const createCategory_service_1 = __importDefault(require("../../service/category/createCategory.service"));
const listCategoryProduct_service_1 = __importDefault(require("../../service/category/listCategoryProduct.service"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const category = yield (0, createCategory_service_1.default)({ name, description });
    return res.status(201).json(category);
});
exports.createCategory = createCategory;
const listCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const products = yield (0, listCategoryProduct_service_1.default)(id);
    return res.status(200).json(products);
});
exports.listCategories = listCategories;
