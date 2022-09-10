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
const data_source_1 = __importDefault(require("../../data.source"));
const category_entitys_1 = require("../../entities/category.entitys");
const product_entitys_1 = require("../../entities/product.entitys");
const provider_entitys_1 = require("../../entities/provider.entitys");
const AppErros_1 = require("../../errors/AppErros");
const createProductService = ({ name, description, value, saleValue, stock, criticalStock, provider, category }) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = data_source_1.default.getRepository(product_entitys_1.Product);
    const categoryRepository = data_source_1.default.getRepository(category_entitys_1.Category);
    const providerRepository = data_source_1.default.getRepository(provider_entitys_1.Provider);
    const categoryAlreadyExists = yield categoryRepository.findOne({
        where: {
            id: category
        }
    });
    if (!categoryAlreadyExists) {
        throw new AppErros_1.AppError("Category not found", 404);
    }
    const providerAlreadyExists = yield providerRepository.findOne({
        where: {
            id: provider
        }
    });
    if (!providerAlreadyExists) {
        throw new AppErros_1.AppError("Provider not found", 404);
    }
    const productAlreadyExists = yield productRepository.findOne({
        where: {
            name
        }
    });
    if (productAlreadyExists) {
        throw new AppErros_1.AppError("Product already exists", 400);
    }
    const newProduct = productRepository.create({
        name,
        description,
        saleValue,
        value,
        stock,
        criticalStock,
        provider: providerAlreadyExists,
        category: categoryAlreadyExists
    });
    yield productRepository.save(newProduct);
    return newProduct;
});
exports.default = createProductService;
