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
const product_entitys_1 = require("../../entities/product.entitys");
const AppErros_1 = require("../../errors/AppErros");
const deleteOneProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = data_source_1.default.getRepository(product_entitys_1.Product);
    const product = yield productRepository.findOne({
        where: {
            id
        }
    });
    if (!product) {
        throw new AppErros_1.AppError("Product not found", 404);
    }
    if (!product.isActive) {
        throw new AppErros_1.AppError("Product not active", 400);
    }
    yield productRepository.update(product.id, {
        isActive: false
    });
});
exports.default = deleteOneProductService;
