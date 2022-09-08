import { Response, Request } from "express";
import profileAcessLogservice from "../../service/AccessLog/profileAcessLog.service";
const accesLogProfileController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const accessLog = await profileAcessLogservice(id);
  return res.status(200).json(accessLog);
};
export default accesLogProfileController;
