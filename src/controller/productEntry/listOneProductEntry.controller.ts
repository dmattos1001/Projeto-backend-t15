import { Request, Response } from "express";
import listOneProductEntryService from "../../service/productEntry/listOneProductEntry.service";

const listOneProductEntryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const productEntry = await listOneProductEntryService(id);

  return res.status(200).json(productEntry);
};

export default listOneProductEntryController;
