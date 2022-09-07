import AppDataSource from "../../data.source";
import { Product } from "../../entities/product.entitys";

const listProductsService = async (): Promise<Product[]> => {

    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    return products;
    

}

export default listProductsService;