import AppDataSource from "../../data.source";
import { Category } from "../../entities/category.entitys";
import { AppError } from "../../errors/AppErros";

const ProfileCategoryProduct = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOne({
    where: {
      id,
    },

    relations: {
      product: true,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export default ProfileCategoryProduct;
