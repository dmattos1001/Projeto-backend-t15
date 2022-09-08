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
const outputProduct_entitys_1 = require("../../entities/outputProduct.entitys");
const AppErros_1 = require("../../errors/AppErros");
const data_source_1 = __importDefault(require("./../../data.source"));
const outputProductGetIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const outputProductRepository = data_source_1.default.getRepository(outputProduct_entitys_1.OutputProduct);
    const findOutputProduct = yield outputProductRepository.find();
    const findId = findOutputProduct.find((element) => element.id === id);
    if (!findId) {
        throw new AppErros_1.AppError("Product output is not found", 404);
    }
    const outputProductIdFind = yield outputProductRepository.findOneBy({ id: id });
    return outputProductIdFind;
});
exports.default = outputProductGetIdService;
