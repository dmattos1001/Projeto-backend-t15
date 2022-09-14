import AppDataSource from "../../data.source";
import { ProductOrder } from "../../entities/productOrder.entitys";
import { AppError } from "../../errors/AppErros";
import { sendEmail } from "../../sendEmail/nodemailer.util";

const deleProductOrderService = async (
  id: string,
  email: string
): Promise<string> => {
  const productOrderRepository = AppDataSource.getRepository(ProductOrder);
  await productOrderRepository.update(id, { isActive: false });
  const deleteProductOrder = await productOrderRepository.findOneBy({
    id: id,
  });
  if (!deleteProductOrder) {
    throw new AppError("id not found", 404);
  }
  const data = new Date();
  if (!deleteProductOrder.isActive) {
    throw new AppError(
      `Product Order already deactivated please wait until day ${data} to be deleted`
    );
  }
  data.setDate(data.getDate() + 7);
  const schedule = require("node-schedule");
  const job2 = schedule.scheduleJob(data, async () => {
    await sendEmail({
      subject: `the product order of the name ${deleteProductOrder.name} was deleted on day ${data}`,
      text: "Product order deleted",
      to: email,
    });
    await productOrderRepository.delete(id);
  });
  job2.nextInvocation();
  return "Product order will be permanently deleted in 7 days";
};

export default deleProductOrderService;
