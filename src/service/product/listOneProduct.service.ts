import AppDataSource from "../../data.source";
import { Product } from "../../entities/product.entitys";
import { AppError } from "../../errors/AppErros";

const listOneProductsService = async (id: string): Promise<Product> => {

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({

        where: {

            id

        }

    });

    if (!product) {

        throw new AppError("Product not found", 404)

    }

    return product;

}

export default listOneProductsService;