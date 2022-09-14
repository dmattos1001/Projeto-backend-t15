import AppDataSource from "../../data.source";
import { Product } from "../../entities/product.entitys";
import { ProductOrder } from "../../entities/productOrder.entitys";
import { User } from "../../entities/user.entitys";
import { AppError } from "../../errors/AppErros";
import { IProductOrderRequest } from "../../interfaces/productOrder/productOrder";
import { sendEmail } from "../../sendEmail/nodemailer.util";
const createProductOrderService = async ({
  name,
  quantityOfProducts,
  user,
  product,
  email,
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
  const newProductOrder = productOrderRepository.create({
    name,
    quantityOfProducts,
    user: userExist,
    product: productExist,
  });
  const ProductOrderfind = await productOrderRepository.save(newProductOrder);
  const data = new Date();
  data.setDate(data.getDate() + 5);
  const schedule = require("node-schedule");
  const job = schedule.scheduleJob(data, async () => {
    await sendEmail({
      subject: `
      Product order of name ${ProductOrderfind.name} was created day ${ProductOrderfind.requestDate} just expired day ${data} `,
      text: "Product order expiration",
      to: email,
    });
    await productOrderRepository.update(ProductOrderfind.id, {
      isActive: false,
    });
  });
  job.nextInvocation();
  data.setDate(data.getDate() + 7);
  const job2 = schedule.scheduleJob(data, async () => {
    await sendEmail({
      subject: `
        The product order with the name ${ProductOrderfind.name} was deleted ${data} `,
      text: "Product order expiration",
      to: email,
    });
    await productOrderRepository.delete(ProductOrderfind.id);
  });
  job2.nextInvocation();
  return newProductOrder;
};

export default createProductOrderService;
