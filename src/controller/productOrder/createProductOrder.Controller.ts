import { Response, Request } from "express";
import createProductOrderService from "../../service/productOrder/createProductOrder.service";

const createProductOrderController = async (req: Request, res: Response) => {
  const user = req.user.id;
  const email = req.user.emailAdm;
  const { name, quantityOfProducts, product } = req.body;
  const productOrder = await createProductOrderService({
    name,
    quantityOfProducts,
    user,
    product,
    email,
  });
  return res.status(201).json(productOrder);
};

export default createProductOrderController;
