import { User } from "../../entities/user.entitys";
import AppDataSource from "../../data.source";
import { AppError } from "../../errors/AppErros";

const listUserByIdService = async (id: string): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);

  const listUserId = await userRepository.findOneBy({ id: id });

  if (!listUserId) {
    throw new AppError("User not found", 404);
  }

  return listUserId;
};

export default listUserByIdService;
