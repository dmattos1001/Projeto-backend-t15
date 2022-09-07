import AppDataSource from "../../data.source";
import { OutputProduct } from "../../entities/outputProduct.entitys";

const outputProductGetService = async () =>{

const outputProductRepository = AppDataSource.getRepository(OutputProduct)

const outputProduct = await outputProductRepository.find()

return outputProduct
}

export default outputProductGetService