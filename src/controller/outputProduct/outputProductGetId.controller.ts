import{Request, Response} from "express"
import outputProductGetIdService from './../../service/outputProducts/outputProductGetId.service';

const outputProductGetIdController = async (req:Request, res:Response) =>{
    
      const id = req.params.id

      const outputProduct = await outputProductGetIdService(id)
      return res.json(outputProduct)
        
   
}

export default outputProductGetIdController