import AppDataSource from "../../data.source";
import { Category } from "../../entities/category.entitys";
import { AppError } from "../../errors/AppErros";
import { ICategoryRequest } from "../../interfaces/category/category";

const createCategorieService = async ({name, description}: ICategoryRequest): Promise<Category> => {

    const categoryRepository = AppDataSource.getRepository(Category);

    const categoryAlreadyExists = await categoryRepository.findOne({

        where: {

            name

        }

    });

    if (categoryAlreadyExists) {

        throw new AppError("Categorie already exists");

    }

    const category = categoryRepository.create({

        name,
        description

    });

    await categoryRepository.save(category);

    return category;

}

export default createCategorieService;