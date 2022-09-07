import AppDataSource from "../../data.source";
import { ProductEntry } from "../../entities/ProductEntry.entitys";
import { AppError } from "../../errors/AppErros";

const listProductEntriesService = async () => {
  const productEntryRepository = AppDataSource.getRepository(ProductEntry);

  const productEntries = await productEntryRepository.find();

  if (!productEntries) {
    throw new AppError("Product entries not found", 404);
  }

  return productEntries;
};

export default listProductEntriesService;
