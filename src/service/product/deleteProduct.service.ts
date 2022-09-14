import AppDataSource from "../../data.source";
import { Product } from "../../entities/product.entitys";
import { AppError } from "../../errors/AppErros";

import { sendEmail } from "../../sendEmail/nodemailer.util";

const deleteOneProductService = async (id: string, email: string) => {
  const productRepository = AppDataSource.getRepository(Product);

  const product = await productRepository.findOneBy({ id: id });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (!product.isActive) {
    throw new AppError("Product not active", 400);
  }

  await productRepository.update(product.id, {
    isActive: false,
  });
  const data = new Date();
  data.setDate(data.getDate() + 7);
  const schedule = require("node-schedule");
  const job2 = schedule.scheduleJob(data, async () => {
    await sendEmail({
      subject: `the product of the name ${Product.name} was deleted on day ${data}`,
      text: "Product deleted",
      to: email,

    });
    await productRepository.delete(id);
  });
  job2.nextInvocation();

  return "Product will be permanently deleted in 7 days";
};


export default deleteOneProductService;
