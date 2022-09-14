import { Request, Response } from "express";
import outputProductPostService from "./../../service/outputProducts/outputProductPost.service";

const outputProductPostController = async (req: Request, res: Response) => {
  
    const { name, descriptio, quantity, productId } = req.body;
    const userId = req.user.id;
    const newOutputProduct = await outputProductPostService({
      name,
      descriptio,
      quantity,
      userId,
      productId,
    });
    return res.status(201).json(newOutputProduct);
};

export default outputProductPostController;
