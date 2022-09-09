import { Response, Request } from "express";
import profileAcessLogservice from "../../service/AccessLog/profileAcessLog.service";
const accesLogProfileController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = await profileAcessLogservice(id);
  return res.status(200).json(token);
};
export default accesLogProfileController;
