import{Request, Response} from "express"
import providerGetIdService from './../../service/provider/providerGetId.service';


const providerGetIdController = async (req:Request, res:Response) =>{
    
      const id = req.params.id

      const providers = await providerGetIdService(id)
      return res.json(providers)
        
   
}

export default providerGetIdController