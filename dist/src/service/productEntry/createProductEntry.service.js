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
const ProductEntry_entitys_1 = require("../../entities/ProductEntry.entitys");
const provider_entitys_1 = require("../../entities/provider.entitys");
const user_entitys_1 = require("../../entities/user.entitys");
const AppErros_1 = require("../../errors/AppErros");
const createProductEntryService = ({ name, quantity, userId, productsId, providerId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const productEntryRepository = data_source_1.default.getRepository(ProductEntry_entitys_1.ProductEntry);
    const productsRepository = data_source_1.default.getRepository(product_entitys_1.Product);
    const userRepository = data_source_1.default.getRepository(user_entitys_1.User);
    const providerRepository = data_source_1.default.getRepository(provider_entitys_1.Provider);
    const productExists = yield productsRepository.findOneBy({ id: productsId });
    const userExists = yield userRepository.findOneBy({ id: userId });
    const providerExists = yield providerRepository.findOneBy({ id: providerId });
    if (!productExists) {
        throw new AppErros_1.AppError("Unregistered product", 400);
    }
    if (!userExists) {
        throw new AppErros_1.AppError("User not found", 404);
    }
    if (!providerExists) {
        throw new AppErros_1.AppError("Provider not found", 404);
    }
    if (quantity < 1) {
        throw new AppErros_1.AppError("Quantity must be at least 1", 400);
    }
    const newProductEntry = productEntryRepository.create({
        name,
        quantity,
        product: productExists,
        user: userExists,
        provider: providerExists,
    });
    yield productEntryRepository.save(newProductEntry);
    return newProductEntry;
});
exports.default = createProductEntryService;
