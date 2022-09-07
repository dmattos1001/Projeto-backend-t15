import { Request, Response } from "express";
import sessionsCreateService from "../../service/sessions/sessionCreate.service";

const sessionCreateController = async (req: Request, res: Response) => {
  const { cpf, password } = req.body;
  const session = await sessionsCreateService({ cpf, password });
  return res.status(200).json({ token: session });
};
export default sessionCreateController;
