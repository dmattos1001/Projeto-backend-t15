import AppDataSource from "../../data.source";
import { User } from "../../entities/user.entitys";
import { IUserRequest } from "../../interfaces/users/users";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppErros";
import { Address } from "../../entities/address.entitys";

const createUserService = async ({
  name,
  email,
  password,
  cpf,
  occupation,
  telephone,
  cell,
  address,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const enderecos = addressRepository.find();
  const { district, zipCode, number, city, state } = address;

  const zipCodeAlreadyExists = (await enderecos).find(
    (endereco) => endereco.zipCode === zipCode
  );
  if (zipCodeAlreadyExists) {
    throw new AppError("Zipcode already exists", 400);
  }

  const stateAlreadyExists = (await enderecos).find(
    (endereco) => endereco.state === state
  );
  if (stateAlreadyExists) {
    throw new AppError("State already exists", 400);
  }

  const newAddress = addressRepository.create({
    district: district,
    zipCode: zipCode,
    number: number,
    city: city,
    state: state,
  });

  await addressRepository.save(newAddress);

  const users = await userRepository.find();
  const emailAlreadyExists = users.find((user) => user.email === email);
  if (emailAlreadyExists) {
    throw new AppError("Email already exists!", 400);
  }

  if (!password) {
    throw new AppError("Password is a required field", 400);
  }
  const hashedPassword = await hash(password, 10);

  const hashedCpf = await hash(cpf, 12);

  const user = userRepository.create({
    name,
    email,
    cpf: hashedCpf,
    password: hashedPassword,
    occupation,
    telephone,
    cell,
    address: newAddress,
  });
  await userRepository.save(user);
  return user;
};

export default createUserService;
