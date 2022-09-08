import { NextFunction, Request, Response } from "express";
export const administrationNivelOne = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { administrationNivel } = req.user;
  if (!administrationNivel) {
    return res.status(403).send({ message: "Unauthorized user" });
  }
  if (administrationNivel >= 2 || administrationNivel <= 3) {
    next();
  }
  return res.status(403).send({ message: "Unauthorized user" });
};
export default administrationNivelOne;
