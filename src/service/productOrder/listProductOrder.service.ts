import AppDataSource from "../../data.source";
import { ProductOrder } from "../../entities/productOrder.entitys";

const listProductOrderService = async (): Promise<ProductOrder[]> => {
  const product = await AppDataSource.getRepository(ProductOrder).find();
  return product;
};

export default listProductOrderService;
