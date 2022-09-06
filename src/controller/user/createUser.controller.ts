import { Request, Response } from "express";
import createUserService from "../../service/user/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      cpf,
      password,
      occupation,
      telephone,
      cell,
      address: { district, zipCode, number, city, state },
    } = req.body;
    const newUser = await createUserService({
      name,
      email,
      cpf,
      password,
      occupation,
      telephone,
      address: { district, zipCode, number, city, state },
      cell,
    });
    return res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({ message: err.message });
    }
  }
};

export default createUserController;
