import AppDataSource from "../../data.source";
import { AccessLog } from "../../entities/accessLog.entitys";

const listAccessLogService = async (): Promise<AccessLog[]> => {
  const accessLogRepository = await AppDataSource.getRepository(
    AccessLog
  ).find();
  return accessLogRepository;
};
export default listAccessLogService;
