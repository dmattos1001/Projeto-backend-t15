import { Request, Response } from "express";
import listUserByIdService from "../../service/user/listUserById.service";

const listUserByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await listUserByIdService(id);
  return res.json(user);
};

export default listUserByIdController;
