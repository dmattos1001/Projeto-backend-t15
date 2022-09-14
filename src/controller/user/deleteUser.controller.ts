import { Request, Response } from "express";
import deleteUserService from "../../service/user/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await deleteUserService(id);
    return res.status(204).json({
      message: "Deactivated user",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export default deleteUserController;
