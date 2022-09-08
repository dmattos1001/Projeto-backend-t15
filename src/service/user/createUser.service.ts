import AppDataSource from "../../data.source";
import { User } from "../../entities/user.entitys";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppErros";
import { Address } from "../../entities/address.entitys";
import { IUser } from "../../interfaces/users/users";

const createUserService = async ({
  name,
  email,
  password,
  administrationNivel,
  cpf,
  occupation,
  telephone,
  cell,
  address,
}: IUser): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const { district, zipCode, number, city, state } = address;

  const users = await userRepository.find();
  const emailAlreadyExists = users.find((user) => user.email === email);
  if (emailAlreadyExists) {
    throw new AppError("Email already exists!", 400);
  }
  const userCpf = await userRepository.findOneBy({ cpf: cpf });
  if (userCpf) {
    throw new AppError("Cpf already exists!", 400);
  }
  if (!password || !cpf) {
    throw new AppError("Password and CPF is a required field", 400);
  }
  if (zipCode.length >= 11 || state.length > 3) {
    throw new AppError("The zip code can only have 9 digits and state 2", 400);
  }
  const hashedPassword = await hash(password, 10);
  const newAddress = addressRepository.create({
    district: district,
    zipCode: zipCode,
    number: number,
    city: city,
    state: state,
  });
  await addressRepository.save(newAddress);

  const user = userRepository.create({
    name,
    email,
    cpf,
    password: hashedPassword,
    occupation,
    administrationNivel,
    telephone,
    cell,
    address: newAddress,
  });
  await userRepository.save(user);
  return user;
};

export default createUserService;
