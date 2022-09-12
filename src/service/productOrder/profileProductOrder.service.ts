import AppDataSource from "../../data.source";
import { ProductOrder } from "../../entities/productOrder.entitys";
import { AppError } from "../../errors/AppErros";

const profileProductOrderService = async (
  id: string
): Promise<ProductOrder> => {
  try {
    const productOrderRepository = AppDataSource.getRepository(ProductOrder);
    const productOrderExist = await productOrderRepository.findOneBy({
      id: id,
    });
    if (!productOrderExist) {
      throw new AppError("invalid productOrder id", 404);
    }
    return productOrderExist;
  } catch (err) {
    throw new AppError("Invalid Id", 404);
  }
};
export default profileProductOrderService;
