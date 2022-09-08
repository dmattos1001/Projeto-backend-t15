import AppDataSource from "../../data.source";
import { User } from "../../entities/user.entitys";

const deleteUserService = async (id:string)=>{
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({id: id})
  
  if(!user){
    throw new Error("User not found!")
  }
  if(!user.isActive){
    throw new Error("This user is already deactivated");
  }

  const desactiveUser = {
    ...user,
    isActive: false
  }

  await userRepository.update(id, desactiveUser )
}

export default deleteUserService;