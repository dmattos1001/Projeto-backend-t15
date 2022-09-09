import AppDataSource from "../../data.source";
import { User } from "../../entities/user.entitys";
import { AppError } from "../../errors/AppErros";


const deleteUserService = async (id:string)=>{
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({id: id})
  
  if(!user){
    throw new AppError("User not found!",404)

  }
  if (!user.isActive) {
    throw new AppError("This user is already deactivated",400);
  }

  const desactiveUser = {

    ...user,
    isActive: false
  }

  await userRepository.update(id, desactiveUser);
};
export default deleteUserService;
