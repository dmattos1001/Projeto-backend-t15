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
const AppErros_1 = require("../../errors/AppErros");
const listCategoryProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepository = yield data_source_1.default.getRepository(category_entitys_1.Category);
    const category = yield categoryRepository.findOne({
        where: {
            id
        },
        relations: {
            product: true
        }
    });
    if (!category) {
        throw new AppErros_1.AppError("Category not found", 404);
    }
    return category;
});
exports.default = listCategoryProduct;
