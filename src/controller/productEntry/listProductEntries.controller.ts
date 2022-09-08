import { Request, Response } from "express";
import listProductEntriesService from "../../service/productEntry/listProductEntries.service";

const listProductEntriesController = async (req: Request, res: Response) => {
  const productEntries = await listProductEntriesService();

  return res.status(200).json(productEntries);
};

export default listProductEntriesController;
