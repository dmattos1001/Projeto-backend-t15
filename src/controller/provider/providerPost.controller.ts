import { Request, Response } from "express";
import providerPostService from "./../../service/provider/providerPost.service";

const providerPostController = async (req: Request, res: Response) => {
 
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
};

export default providerPostController;
