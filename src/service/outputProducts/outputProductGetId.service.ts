import { OutputProduct } from '../../entities/outputProduct.entitys';
import { AppError } from '../../errors/AppErros';
import AppDataSource from './../../data.source';

const outputProductGetIdService = async(id: string): Promise<any> => {
 
    const outputProductRepository = AppDataSource.getRepository(OutputProduct)
    const findOutputProduct = await outputProductRepository.find()
    const findId = findOutputProduct.find((element)=> element.id === id)
    
    if(!findId){
        throw new AppError("Product output is not found",404)
    }

    const outputProductIdFind = await outputProductRepository.findOneBy({id:id})

    return outputProductIdFind

}

export default outputProductGetIdService