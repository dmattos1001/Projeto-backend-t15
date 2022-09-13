import { AppError } from '../../errors/AppErros';
import AppDataSource from './../../data.source';
import { Provider } from "../../entities/provider.entitys";

const providerGetIdService = async(id: string): Promise<any> => {
 
    const providerRepository = AppDataSource.getRepository(Provider)
    const providerIdFind = await providerRepository.findOneBy({id:id})
    
    if(!providerIdFind){
        throw new AppError("Provider is not found",404)
    }


    return providerIdFind

}

export default providerGetIdService