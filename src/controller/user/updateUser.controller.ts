import { Request, Response } from "express";
import updatedUserService from "../../service/user/updateUser.service";

const updateUserController  = async (req:Request, res:Response) =>{
  try {
    const userUpdateData    = req.body
    const updatedUser       = await updatedUserService(userUpdateData)
    return res
      .status(201).json(updatedUser)

  } catch (error) {
    if(error instanceof Error){
      return res
        .status(400).json({
          error: error.name,
          message: error.message
        })
    }
  }
}

export default updateUserController;