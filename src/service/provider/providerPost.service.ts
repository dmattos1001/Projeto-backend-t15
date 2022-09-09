import {
  IProvider,
  IProviderRequest,
} from "./../../interfaces/providers/provider";
import AppDataSource from "../../data.source";
import { AppError } from "../../errors/AppErros";
import { Provider } from "../../entities/provider.entitys";

const providerPostService = async ({
  name,
  telephone,
  email,
  cnpj,
  address,
  employee,
  employeeCell,
}: IProviderRequest): Promise<IProvider> => {
  const providerRepository = AppDataSource.getRepository(Provider);
  const cnpjVerify = await providerRepository.findOneBy({ cnpj: cnpj });

  if (cnpjVerify) {
    throw new AppError("Cnpj already exists", 400);
  }

  const newProvider = providerRepository.create({
    name,
    telephone,
    email,
    cnpj,
    address,
    employee,
    employeeCell,
  });
  await providerRepository.save(newProvider);

  return newProvider;
};

export default providerPostService;
