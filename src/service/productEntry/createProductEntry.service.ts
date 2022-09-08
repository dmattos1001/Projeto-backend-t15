import AppDataSource from "../../data.source";
import { Product } from "../../entities/product.entitys";
import { ProductEntry } from "../../entities/ProductEntry.entitys";
import { Provider } from "../../entities/provider.entitys";
import { User } from "../../entities/user.entitys";
import { AppError } from "../../errors/AppErros";
import { IProductEntryRequest } from "../../interfaces/productEntry";

const createProductEntryService = async ({
  name,
  quantity,
  userId,
  productsId,
  providerId,
}: IProductEntryRequest) => {
  const productEntryRepository = AppDataSource.getRepository(ProductEntry);

  const productsRepository = AppDataSource.getRepository(Product);

  const userRepository = AppDataSource.getRepository(User);

  const providerRepository = AppDataSource.getRepository(Provider);

  const productExists = await productsRepository.findOneBy({ id: productsId });

  const userExists = await userRepository.findOneBy({ id: userId });

  const providerExists = await providerRepository.findOneBy({ id: providerId });

  if (!productExists) {
    throw new AppError("Unregistered product", 400);
  }
  if (!userExists) {
    throw new AppError("User not found", 404);
  }
  if (!providerExists) {
    throw new AppError("Provider not found", 404);
  }
  if (quantity < 1) {
    throw new AppError("Quantity must be at least 1", 400);
  }

  const newProductEntry = productEntryRepository.create({
    name,
    quantity,
    product: productExists,
    user: userExists,
    provider: providerExists,
  });

  await productEntryRepository.save(newProductEntry);

  return newProductEntry;
};

export default createProductEntryService;
