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
const bcryptjs_1 = require("bcryptjs");
const AppErros_1 = require("../../errors/AppErros");
const address_entitys_1 = require("../../entities/address.entitys");
const createUserService = ({ name, email, password, administrationNivel, cpf, occupation, telephone, cell, address, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entitys_1.User);
    const addressRepository = data_source_1.default.getRepository(address_entitys_1.Address);
    const { district, zipCode, number, city, state } = address;
    const users = yield userRepository.find();
    const emailAlreadyExists = users.find((user) => user.email === email);
    if (emailAlreadyExists) {
        throw new AppErros_1.AppError("Email already exists!", 400);
    }
    const userCpf = yield userRepository.findOneBy({ cpf: cpf });
    if (userCpf) {
        throw new AppErros_1.AppError("Cpf already exists!", 400);
    }
    if (!password || !cpf) {
        throw new AppErros_1.AppError("Password and CPF is a required field", 400);
    }
    if (zipCode.length >= 11 || state.length > 3) {
        throw new AppErros_1.AppError("The zip code can only have 9 digits and state 2", 400);
    }
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const newAddress = addressRepository.create({
        district: district,
        zipCode: zipCode,
        number: number,
        city: city,
        state: state,
    });
    yield addressRepository.save(newAddress);
    const user = userRepository.create({
        name,
        email,
        cpf,
        password: hashedPassword,
        occupation,
        administrationNivel,
        telephone,
        cell,
        address: newAddress,
    });
    yield userRepository.save(user);
    return user;
});
exports.default = createUserService;
