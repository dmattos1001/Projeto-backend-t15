import AppDataSource from "../../data.source";
import { AccessLog } from "../../entities/accessLog.entitys";
import { AppError } from "../../errors/AppErros";

const profileAcessLogservice = async (id: string): Promise<AccessLog> => {
  const accessLogRepository = await AppDataSource.getRepository(
    AccessLog
  ).findOneBy({ id: id });
  if (!accessLogRepository) {
    throw new AppError("invalid id", 404);
  }
  return accessLogRepository;
};
export default profileAcessLogservice;
