import AppDataSource from "../../data.source";
import { Product } from "../../entities/product.entitys";

const listCriticalStockProductService = async (): Promise<Product[]> => {
  const productRepository = AppDataSource.getRepository(Product);
  const product = await productRepository.find();
  const filterProduct = product.filter(
    (element) => element.criticalStock >= element.stock
  );

  return filterProduct;
};
export default listCriticalStockProductService;
