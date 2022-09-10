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
const AppErros_1 = require("../../errors/AppErros");
const provider_entitys_1 = require("../../entities/provider.entitys");
const providerPostService = ({ name, telephone, email, cnpj, address, employee, employeeCell, }) => __awaiter(void 0, void 0, void 0, function* () {
    const providerRepository = data_source_1.default.getRepository(provider_entitys_1.Provider);
    const cnpjVerify = yield providerRepository.findOneBy({ cnpj: cnpj });
    console.log("ola mundo");
    if (cnpjVerify) {
        throw new AppErros_1.AppError("Cnpj already exists", 400);
    }
    const newProvider = providerRepository.create({
        name,
        telephone,
        email,
        cnpj,
        address,
        employee,
        employeeCell,
    });
    yield providerRepository.save(newProvider);
    return newProvider;
});
exports.default = providerPostService;
