import{Request, Response} from "express"
import outputProductGetService from './../../service/outputProducts/outputProductGet.service';

const outputProductGetController = async (req:Request, res:Response) =>{
   
    try{
       const outputProduct = await outputProductGetService()
      return res.status(200).send(outputProduct) 
    }catch(err){
        if(err instanceof Error){
            return res.status(400).send({message: err.message})
          }
    }
      
        
  
}

export default outputProductGetController