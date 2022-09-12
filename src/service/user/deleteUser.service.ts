import AppDataSource from "../../data.source";
import { User } from "../../entities/user.entitys";
import { AppError } from "../../errors/AppErros";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    throw new AppError("User not found!");
  }
  if (!user.isActive) {
    throw new AppError("This user is already deactivated");

  }
  const userAdm = await userRepository.find();
  const adminuserNotDelete = userAdm.find(
    (element) => element.email === "adminuser@gmail.com"
  );
  if (adminuserNotDelete) {
    throw new AppError("adminuser cannot be deleted");
  }
  const desactiveUser = {
    isActive: false,
  };

  await userRepository.update(id, desactiveUser);
};
export default deleteUserService;
