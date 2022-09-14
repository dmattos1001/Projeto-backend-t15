import {
  IOutputProducts, IOutputProductsReq,
} from "./../../interfaces/outputProducts/outputProducts";
import AppDataSource from "./../../data.source";
import { OutputProduct } from "../../entities/outputProduct.entitys";
import { AppError } from "../../errors/AppErros";
import { Product } from "../../entities/product.entitys";

const outputProductPostService = async ({
  name,
  descriptio,
  quantity,
  userId,
  productId,
}: IOutputProductsReq): Promise<IOutputProducts> => {
  const outputProductRepository = AppDataSource.getRepository(OutputProduct);
  const productRepository = AppDataSource.getRepository(Product);
  const outputProductFind = await outputProductRepository.findOneBy({
    name: name,
  });
  if (outputProductFind) {
    throw new AppError("Product Order already Exists", 400);
  }
  const productExistis = await productRepository.findOneBy({ id: productId });
  if (!productExistis) {
    throw new AppError("Product not found", 404);
  }

  if (productExistis.stock - quantity <= 0) {
    throw new AppError("don't have enough stock", 400);
  }

  let message = undefined;
  if (productExistis.stock - quantity <= productExistis.criticalStock) {
    message = "quantity of products at critical level";
  }

  const newOutputProduct = new OutputProduct();
  (newOutputProduct.name = name),
    (newOutputProduct.descriptio = descriptio),
    (newOutputProduct.quantity = quantity),
    (newOutputProduct.user = userId),
    (newOutputProduct.product = productId);
  outputProductRepository.create(newOutputProduct);
  await outputProductRepository.save(newOutputProduct);
  productRepository.update(productId, {
    stock: productExistis.stock - quantity,
  });
  return {
    id: newOutputProduct.id,
    name: newOutputProduct.name,
    descriptio: newOutputProduct.descriptio,
    quantity: newOutputProduct.quantity,
    userId: newOutputProduct.user,
    productId: newOutputProduct.product,
    message: message,
  };
};

export default outputProductPostService;
