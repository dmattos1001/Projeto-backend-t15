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
const providerPost_service_1 = __importDefault(require("./../../service/provider/providerPost.service"));
const providerPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, telephone, email, cnpj, address, employee, employeeCell } = req.body;
        const newProvider = yield (0, providerPost_service_1.default)({
            name,
            telephone,
            email,
            cnpj,
            address,
            employee,
            employeeCell,
        });
        return res.status(201).json(newProvider);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send({ message: err.message });
        }
    }
});
exports.default = providerPostController;
