import { User } from "../../entities/user.entitys";
import AppDataSource from "../../data.source";

const listUserService = async (): Promise<User[]> => {
  const users = await AppDataSource.getRepository(User).find();

  return users;
};

export default listUserService;
