import AppDataSource from "../../data.source";
import { AccessLog } from "../../entities/accessLog.entitys";
import { User } from "../../entities/user.entitys";
import { AppError } from "../../errors/AppErros";

const listUserAccessLogService = async (id: string) => {
  try {
    const accessLogRepository = AppDataSource.getRepository(AccessLog);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: id });
    if (!user) {
      throw new AppError("Invalid Id", 404);
    }
    const accessLogExists = await accessLogRepository.find();
    const userList = accessLogExists.filter(
      (element) => element.user.id === id
    );
    if (!accessLogExists) {
      throw new AppError("Invalid Id", 404);
    }
    return userList;
  } catch (err) {
    throw new AppError("Invaçid Id", 404);
  }
};

export default listUserAccessLogService;
