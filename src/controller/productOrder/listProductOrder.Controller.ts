import { Response, Request } from "express";
import listProductOrderService from "../../service/productOrder/listProductOrder.service";

const listProductOrderController = async (req: Request, res: Response) => {
  const productOrder = await listProductOrderService();
  return res.status(200).json(productOrder);
};

export default listProductOrderController;
