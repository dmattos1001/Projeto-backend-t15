"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.administrationNivelThree = void 0;
const administrationNivelThree = (req, res, next) => {
    const { administrationNivel } = req.user;
    if (!administrationNivel) {
        return res.status(403).send({ message: "Unauthorized user" });
    }
    if (administrationNivel === 3) {
        return next();
    }
    return res.status(403).send({ message: "Unauthorized user" });
};
exports.administrationNivelThree = administrationNivelThree;
exports.default = exports.administrationNivelThree;
