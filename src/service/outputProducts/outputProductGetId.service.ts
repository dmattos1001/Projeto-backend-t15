import { OutputProduct } from '../../entities/outputProduct.entitys';
import { AppError } from '../../errors/AppErros';
import AppDataSource from './../../data.source';

const outputProductGetIdService = async(id: string): Promise<any> => {
 
    const outputProductRepository = AppDataSource.getRepository(OutputProduct)
    const outputProductIdFind = await outputProductRepository.findOneBy({id:id})
   
    if(!outputProductIdFind){
        throw new AppError("Product output is not found",404)
    }


    return outputProductIdFind

}

export default outputProductGetIdService