import { Response, Request } from "express";
import listAccessLogService from "../../service/AccessLog/listAccessLog.service";
const accesLogListController = async (req: Request, res: Response) => {
  const accessLog = await listAccessLogService();
  return res.status(200).json(accessLog);
};
export default accesLogListController;
