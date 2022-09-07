import AppDataSource from "../../data.source";
import { Address } from "../../entities/address.entitys";
import { User } from "../../entities/user.entitys";
import { IUserRequest } from "../../interfaces/users/users";

const updatedUserService    = async (userUpdateData:IUserRequest): Promise<User>=>{
  const userRepository      = AppDataSource.getRepository(User)
  const addressRepository   = AppDataSource.getRepository(Address);

  const user                = userRepository.findOneBy({email: userUpdateData.email})

  const address             = addressRepository.findOneBy({id: user.address.id})
  const newAddressReceived  = {
    district: userUpdateData.address.district || address.district,
    zipCode: userUpdateData.address.zipCode   || address.zipCode,
    number: userUpdateData.address.number     || address.number, 
    city: userUpdateData.address.city         || address.city,
    state: userUpdateData.address.state       || address.state,
  }
  const newAddress          = await addressRepository.update(address, newAddressReceived)
  
  const updatedUser         = {
    ...user,
    email: userUpdateData.email,
    password: userUpdateData.password,
    occupation: userUpdateData.occupation,
    telephone: userUpdateData.telephone,
    cell: userUpdateData.cell,
    addressId: newAddress
  }

  return updatedUser
}

export default updatedUserService;