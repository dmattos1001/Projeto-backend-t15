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
const outputProductPost_service_1 = __importDefault(require("./../../service/outputProducts/outputProductPost.service"));
const outputProductPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, descriptio, quantity, outputdate, userId, productId } = req.body;
        const newOutputProduct = yield (0, outputProductPost_service_1.default)({ name, descriptio, quantity, outputdate, userId, productId });
        if (quantity <= 5) {
            return res.status(201).json({ newOutputProduct, message: "it is necessary to supply" });
        }
        return res.status(201).json(newOutputProduct);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).send({ message: err.message });
        }
    }
});
exports.default = outputProductPostController;
