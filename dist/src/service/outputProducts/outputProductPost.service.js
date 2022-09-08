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
const data_source_1 = __importDefault(require("./../../data.source"));
const outputProduct_entitys_1 = require("../../entities/outputProduct.entitys");
const AppErros_1 = require("../../errors/AppErros");
const outputProductPostService = ({ name, descriptio, quantity, outputdate, userId, productId }) => __awaiter(void 0, void 0, void 0, function* () {
    const outputProductRepository = data_source_1.default.getRepository(outputProduct_entitys_1.OutputProduct);
    const outputProductFind = yield outputProductRepository.findOneBy({ name: name });
    const outputProductFindId = yield outputProductRepository.findOneBy({ id: productId });
    if (outputProductFind) {
        throw new AppErros_1.AppError("Product Order already Exists", 400);
    }
    if (!outputProductFind) {
        throw new AppErros_1.AppError("Product not found", 404);
    }
    if (outputProductFindId) {
        if (quantity > 0) {
            quantity -= 1;
        }
        else {
            quantity = 0;
            throw new AppErros_1.AppError("it is necessary to supply", 400);
        }
    }
    const newOutputProduct = new outputProduct_entitys_1.OutputProduct();
    newOutputProduct.name = name,
        newOutputProduct.descriptio = descriptio,
        newOutputProduct.quantity = quantity,
        newOutputProduct.outputdate = new Date(),
        newOutputProduct.user = userId,
        newOutputProduct.product = productId;
    yield outputProductRepository.create(newOutputProduct);
    yield outputProductRepository.save(newOutputProduct);
    return {
        id: newOutputProduct.id,
        name: newOutputProduct.name,
        descriptio: newOutputProduct.descriptio,
        quantity: newOutputProduct.quantity,
        outputdate: newOutputProduct.outputdate,
        userId: newOutputProduct.user,
        productId: newOutputProduct.product
    };
});
exports.default = outputProductPostService;
