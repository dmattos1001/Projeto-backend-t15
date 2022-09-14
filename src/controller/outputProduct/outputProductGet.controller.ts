import{Request, Response} from "express"
import outputProductGetService from './../../service/outputProducts/outputProductGet.service';

const outputProductGetController = async (req:Request, res:Response) =>{
   
  
       const outputProduct = await outputProductGetService()
      return res.status(200).send(outputProduct) 
     
      
        
  
}

export default outputProductGetController