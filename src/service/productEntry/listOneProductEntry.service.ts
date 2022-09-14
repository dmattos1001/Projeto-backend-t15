import AppDataSource from "../../data.source";
import { ProductEntry } from "../../entities/ProductEntry.entitys";
import { AppError } from "../../errors/AppErros";

const listOneProductEntryService = async (id: string) => {
  const productEntryRepository = AppDataSource.getRepository(ProductEntry);

  const productEntries = await productEntryRepository.findOneBy({id:id});


  if (!productEntries) {
    throw new AppError("Product entry not found", 404);
  }

  return productEntries
};

export default listOneProductEntryService;
