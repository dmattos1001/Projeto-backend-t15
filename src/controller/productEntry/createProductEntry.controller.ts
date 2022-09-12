import { Request, Response } from "express";
import createProductEntryService from "../../service/productEntry/createProductEntry.service";

const createProductEntryController = async (req: Request, res: Response) => {
  const { name, quantity, productsId, providerId } = req.body;
  const userId = req.user.id;
  const productEntry = await createProductEntryService({
    name,
    quantity,
    userId,
    productsId,
    providerId,
  });

  return res.status(201).json(productEntry);
};

export default createProductEntryController;
