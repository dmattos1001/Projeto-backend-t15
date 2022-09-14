import { Request, Response } from "express";
import updatedUserService from "../../service/user/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
 
    const { id } = req.params;
    const userUpdateData = req.body;
    const updatedUser = await updatedUserService(id, userUpdateData);
    return res.status(201).json(updatedUser);
};

export default updateUserController;
