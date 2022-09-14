import { Request, Response } from "express";
import deleProductOrderService from "../../service/productOrder/deleteProductOrder.service";

const deleProductOrderController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const email = req.user.emailAdm;
  const productOrder = await deleProductOrderService(id, email);
  return res.status(200).json({ message: productOrder });
};

export default deleProductOrderController;
