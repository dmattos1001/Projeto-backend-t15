import AppDataSource from "../../data.source";
import { Address } from "../../entities/address.entitys";
import { User } from "../../entities/user.entitys";
import { AppError } from "../../errors/AppErros";
import { IUserRequest } from "../../interfaces/users/users";

const updatedUserService = async (
  id: string,
  userUpdateData: IUserRequest
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const user = await userRepository.findOneByOrFail({
    id: id,
  });
  if (!user) {
    throw new AppError("user is not found", 404);
  }
  const address = await addressRepository.findOneByOrFail({
    id: user.address.id,
  });
  

  if (userUpdateData.address) {
    const newAddressReceived = {
      district: userUpdateData.address.district || address.district,
      zipCode: userUpdateData.address.zipCode || address.zipCode,
      number: userUpdateData.address.number || address.number,
      city: userUpdateData.address.city || address.city,
      state: userUpdateData.address.state || address.state,
    };
    await addressRepository.update(address.id, newAddressReceived);
  }

  const updatedUser = {
    name: userUpdateData.name || user.name,
    email: userUpdateData.email || user.email,
    password: userUpdateData.password || user.password,
    occupation: userUpdateData.occupation || user.occupation,
    telephone: userUpdateData.telephone || user.telephone,
    cell: userUpdateData.cell || user.cell,
  };
  await userRepository.update(id, updatedUser);
  return user;
};
export default updatedUserService;
