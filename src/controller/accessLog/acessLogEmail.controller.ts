import { Request, Response } from "express";
import acessLogEmailService from "../../service/AccessLog/acessLogEmail.service";

const acessLogEmailController = async (req: Request, res: Response) => {
  const { id, data, email } = req.body;
  const accessLog = await acessLogEmailService({ id, data, email });
  return res.status(200).json({ message: accessLog });
};

export default acessLogEmailController;
