import { Request, Response } from "express";
import profileProductOrderService from "../../service/productOrder/profileProductOrder.service";

const profileProductOrderController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productOrder = await profileProductOrderService(id);
  return res.status(200).json(productOrder);
};

export default profileProductOrderController;
