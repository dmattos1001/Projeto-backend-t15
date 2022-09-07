import AppDataSource from "../../data.source"
import { Category } from "../../entities/category.entitys"
import { AppError } from "../../errors/AppErros";

const listCategoryProduct = async (id: string) => {

    const categoryRepository = await AppDataSource.getRepository(Category);

    const category = await categoryRepository.findOne({

        where: {

            id

        },

        relations: {

            product: true

        }

    });

    if (!category) {

        throw new AppError("Category not found", 404);

    }

    return category;

}

export default listCategoryProduct;