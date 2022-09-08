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
const address_entitys_1 = require("../../entities/address.entitys");
const user_entitys_1 = require("../../entities/user.entitys");
const AppErros_1 = require("../../errors/AppErros");
const updatedUserService = (id, userUpdateData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(user_entitys_1.User);
    const addressRepository = data_source_1.default.getRepository(address_entitys_1.Address);
    const user = yield userRepository.findOneByOrFail({
        id: id,
    });
    if (!user) {
        throw new AppErros_1.AppError("hitalo", 400);
    }
    const address = yield addressRepository.findOneByOrFail({
        id: user.address.id,
    });
    if (userUpdateData.address) {
        const newAddressReceived = {
            district: userUpdateData.address.district || address.district,
            zipCode: userUpdateData.address.zipCode || address.zipCode,
            number: userUpdateData.address.number || address.number,
            city: userUpdateData.address.city || address.city,
            state: userUpdateData.address.state || address.state,
        };
        yield addressRepository.update(address.id, newAddressReceived);
    }
    const updatedUser = {
        name: userUpdateData.name || user.name,
        email: userUpdateData.email || user.email,
        password: userUpdateData.password || user.password,
        occupation: userUpdateData.occupation || user.occupation,
        telephone: userUpdateData.telephone || user.telephone,
        cell: userUpdateData.cell || user.cell,
    };
    yield userRepository.update(id, updatedUser);
    return user;
});
exports.default = updatedUserService;
