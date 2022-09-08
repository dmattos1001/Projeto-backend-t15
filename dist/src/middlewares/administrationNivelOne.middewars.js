"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.administrationNivelOne = void 0;
const administrationNivelOne = (req, res, next) => {
    const { administrationNivel } = req.user;
    if (!administrationNivel) {
        return res.status(403).send({ message: "Unauthorized user" });
    }
    if (administrationNivel >= 1 || administrationNivel <= 3) {
        return next();
    }
    return res.status(403).send({ message: "Unauthorized user" });
};
exports.administrationNivelOne = administrationNivelOne;
exports.default = exports.administrationNivelOne;
