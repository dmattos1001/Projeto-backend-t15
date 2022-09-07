import { Request, Response } from "express";
import createUserService from "../../service/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  const {
    name,
    email,
    cpf,
    password,
    administrationNivel,
    occupation,
    telephone,
    cell,
    address,
  } = req.body;
  const newUser = await createUserService({
    name,
    email,
    cpf,
    password,
    administrationNivel,
    occupation,
    telephone,
    address,
    cell,
  });
  return res.status(201).json(newUser);
};

export default createUserController;
