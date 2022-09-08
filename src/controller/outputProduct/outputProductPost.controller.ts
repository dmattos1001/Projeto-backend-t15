import { Request, Response } from "express";
import outputProductPostService from './../../service/outputProducts/outputProductPost.service';

const outputProductPostController = async (req: Request, res: Response) => {

  try{
     const { name,descriptio,quantity,outputdate,userId,productId } = req.body;

    const newOutputProduct = await outputProductPostService({name,descriptio,quantity,outputdate,userId,productId}) 
    if(quantity <= 5){
      return res.status(201).json({newOutputProduct,message: "it is necessary to supply"})
     }
    return res.status(201).json(newOutputProduct);
  }catch(err){
    if(err instanceof Error){
      return res.status(400).send({message: err.message})
    }
  }
   
  };
  
  export default outputProductPostController