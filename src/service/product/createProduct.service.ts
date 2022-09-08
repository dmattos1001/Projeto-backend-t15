import AppDataSource from "../../data.source";
import { Category } from "../../entities/category.entitys";
import { Product } from "../../entities/product.entitys";
import { Provider } from "../../entities/provider.entitys";
import { AppError } from "../../errors/AppErros";
import { IProduct } from "../../interfaces/product/product";

const createProductService = async ({name, description, value,  saleValue, stock, criticalStock, provider, category}: IProduct): Promise<Product> => {

    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);
    const providerRepository = AppDataSource.getRepository(Provider);

    const categoryAlreadyExists = await categoryRepository.findOne({

        where: {

            id: category

        }

    });

    if (!categoryAlreadyExists) {

        throw new AppError("Category not found", 404);

    }

    const providerAlreadyExists = await providerRepository.findOne({

        where: {

            id: provider
        }

    });

    if (!providerAlreadyExists) {

        throw new AppError("Provider not found", 404);

    }

    const productAlreadyExists = await productRepository.findOne({

        where: {

            name

        }

    });

    if (productAlreadyExists) {

        throw new AppError("Product already exists", 400);

    }

    const newProduct = productRepository.create({

        name,
        description,
        saleValue,
        value,
        stock,
        criticalStock, 
        provider: providerAlreadyExists, 
        category: categoryAlreadyExists

    });

    await productRepository.save(newProduct);

    return newProduct;

}

export default createProductService;