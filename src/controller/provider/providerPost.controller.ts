import { Request, Response } from "express";
import providerPostService from "./../../service/provider/providerPost.service";

const providerPostController = async (req: Request, res: Response) => {
  try {
    const { name, telephone, email, cnpj, address, employee, employeeCell } =
      req.body;

    const newProvider = await providerPostService({
      name,
      telephone,
      email,
      cnpj,
      address,
      employee,
      employeeCell,
    });
    return res.status(201).json(newProvider);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({ message: err.message });
    }
  }
};

export default providerPostController;
