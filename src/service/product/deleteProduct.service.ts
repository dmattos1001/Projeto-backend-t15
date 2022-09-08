import AppDataSource from "../../data.source";
import { Product } from "../../entities/product.entitys";
import { AppError } from "../../errors/AppErros";

const deleteOneProductService = async (id: string) => {

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({

        where: {

            id

        }

    });

    if (!product) {

        throw new AppError("Product not found", 404)

    }

    if (!product.isActive) {

        throw new AppError("Product not active", 400)

    }

    await productRepository.update(product.id, {

        isActive: false

    });

}

export default deleteOneProductService;