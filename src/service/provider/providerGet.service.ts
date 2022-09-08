import { Provider } from "../../entities/provider.entitys";
import AppDataSource from "./../../data.source";

const providerGetService = async () => {
  const providerRepository = AppDataSource.getRepository(Provider);

  const providersFind = await providerRepository.find();

  return providersFind;
};

export default providerGetService;
