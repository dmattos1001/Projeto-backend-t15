import AppDataSource from "../../data.source";
import { Product } from "../../entities/product.entitys";
import { ProductOrder } from "../../entities/productOrder.entitys";
import { User } from "../../entities/user.entitys";
import { AppError } from "../../errors/AppErros";
import { IProductOrderRequest } from "../../interfaces/productOrder/productOrder";

const createProductOrderService = async ({
  name,
  quantityOfProducts,
  user,
  product,
}: IProductOrderRequest): Promise<ProductOrder> => {
  const productOrderRepository = AppDataSource.getRepository(ProductOrder);
  const userRepository = AppDataSource.getRepository(User);
  const productRepository = AppDataSource.getRepository(Product);
  const userExist = await userRepository.findOneByOrFail({ id: user });
  const productExist = await productRepository.findOneBy({ id: product });
  if (!productExist) {
    throw new AppError("Invalid product id", 404);
  }
  const nameExists = await productOrderRepository.findOneBy({ name: name });
  if (nameExists) {
    throw new AppError("Product name already registered", 400);
  }
  const productExists = await productOrderRepository.find();
  const productIdExits = productExists.find(
    (element) => element.product.id === product
  );
  // if (productIdExits) {
  //   throw new AppError("product order already exists for this product", 400);
  // }
  const newProductOrder = productOrderRepository.create({
    name,
    quantityOfProducts,
    user: userExist,
    product: productExist,
  });
  await productOrderRepository.save(newProductOrder);
  return newProductOrder;
};

export default createProductOrderService;
