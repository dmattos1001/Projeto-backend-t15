import { AppError } from '../../errors/AppErros';
import AppDataSource from './../../data.source';
import { Provider } from "../../entities/provider.entitys";

const providerGetIdService = async(id: string): Promise<any> => {
 
    const providerRepository = AppDataSource.getRepository(Provider)
    const findProvider = await providerRepository.find()
    const findId = findProvider.find((element)=> element.id === id)
    
    if(!findId){
        throw new AppError("Provider is not found",404)
    }

    const providerIdFind = await providerRepository.findOneBy({id:id})

    return providerIdFind

}

export default providerGetIdService