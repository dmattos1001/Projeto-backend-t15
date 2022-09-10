import { Response, Request } from "express";
import createProductOrderService from "../../service/productOrder/createProductOrder.service";

const createProductOrderController = async (req: Request, res: Response) => {
  try {
    const user = req.user.id;
    const { name, quantityOfProducts, product } = req.body;
    const productOrder = await createProductOrderService({
      name,
      quantityOfProducts,
      user,
      product,
    });
    return res.status(201).json(productOrder);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({ error: err.message });
    }
  }
};

export default createProductOrderController;
