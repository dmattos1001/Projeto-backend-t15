import { User } from "../../entities/user.entitys";
import AppDataSource from "../../data.source";
import { AppError } from "../../errors/AppErros";

const listUserByIdService = async (id: string): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const userId = users.find((element) => element.id === id);

  if (!userId) {
    throw new AppError("User not found", 404);
  }

  const listUserId = await userRepository.findOneBy({ id: id });
  return listUserId;
};

export default listUserByIdService;
