import { Request, Response } from "express";
import outputProductPostService from "./../../service/outputProducts/outputProductPost.service";

const outputProductPostController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({ message: err.message });
    }
  }
};

export default outputProductPostController;
