import { Request,Response } from "express"
import providerGetService from './../../service/provider/providerGet.service';

const providerGetController = async (req:Request, res:Response) => {
   
    const providers = await providerGetService()
    
    return res.json(providers)

}

export default providerGetController