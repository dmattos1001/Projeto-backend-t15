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
const user_entitys_1 = require("../../entities/user.entitys");
const AppErros_1 = require("../../errors/AppErros");
require("dotenv/config");
const accessLog_entitys_1 = require("../../entities/accessLog.entitys");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sessionsCreateService = ({ cpf, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entitys_1.User);
    const acceslog = data_source_1.default.getRepository(accessLog_entitys_1.AccessLog);
    const user = yield userRepository.findOneBy({ cpf: cpf });
    if (!user) {
        throw new AppErros_1.AppError("Invalid CPF or passwor", 403);
    }
    const userPassword = yield (0, bcryptjs_1.compare)(password, user.password);
    if (!userPassword) {
        throw new AppErros_1.AppError("Invalid CPF or password", 403);
    }
    const newAcceslog = acceslog.create({
        user: user,
    });
    yield acceslog.save(newAcceslog);
    const token = jsonwebtoken_1.default.sign({
        administrationNivel: user.administrationNivel,
    }, process.env.SECRET_KEY, {
        subject: user.id,
        expiresIn: "2h",
    });
    return token;
});
exports.default = sessionsCreateService;
