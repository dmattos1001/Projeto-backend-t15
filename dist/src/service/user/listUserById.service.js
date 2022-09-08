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
const user_entitys_1 = require("../../entities/user.entitys");
const data_source_1 = __importDefault(require("../../data.source"));
const AppErros_1 = require("../../errors/AppErros");
const listUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entitys_1.User);
    const listUserId = yield userRepository.findOneBy({ id: id });
    if (!listUserId) {
        throw new AppErros_1.AppError("User not found", 404);
    }
    return listUserId;
});
exports.default = listUserByIdService;
