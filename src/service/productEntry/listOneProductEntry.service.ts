import AppDataSource from "../../data.source";
import { ProductEntry } from "../../entities/ProductEntry.entitys";
import { AppError } from "../../errors/AppErros";

const listOneProductEntryService = async (id: string) => {
  const productEntryRepository = AppDataSource.getRepository(ProductEntry);

  const productEntries = await productEntryRepository.find();

  const productEntry = productEntries.find((product) => product.id === id);

  if (!productEntry) {
    throw new AppError("Product entry not found", 404);
  }

  return productEntry;
};

export default listOneProductEntryService;
