import { NextFunction, Request, Response } from "express";
export const administrationNivelThree = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { administrationNivel } = req.user;
  if (!administrationNivel) {
    return res.status(403).send({ message: "Unauthorized user" });
  }
  if (administrationNivel === 3) {
    return next();
  }
  return res.status(403).send({ message: "Unauthorized user" });
};
export default administrationNivelThree;
