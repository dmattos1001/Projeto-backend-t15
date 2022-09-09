import AppDataSource from "../../data.source";
import { Category } from "../../entities/category.entitys";

const listCategoryService = async (): Promise<Category[]> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.find();

  return category;
};

export default listCategoryService;
