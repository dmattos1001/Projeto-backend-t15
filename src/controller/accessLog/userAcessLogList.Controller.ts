import { Request, Response } from "express";
import listUserAccessLogService from "../../service/AccessLog/listUserAccessLog.service";

const userAcessLogListController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userAccesslog = await listUserAccessLogService(id);
  return res.status(200).json(userAccesslog);
};

export default userAcessLogListController;
