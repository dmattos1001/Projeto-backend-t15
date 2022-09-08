"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.administrationNivelTwo = void 0;
const administrationNivelTwo = (req, res, next) => {
    const { administrationNivel } = req.user;
    if (!administrationNivel) {
        return res.status(403).send({ message: "Unauthorized user" });
    }
    if (administrationNivel >= 1 || administrationNivel <= 3) {
        next();
    }
    return res.status(403).send({ message: "Unauthorized user" });
};
exports.administrationNivelTwo = administrationNivelTwo;
exports.default = exports.administrationNivelTwo;
