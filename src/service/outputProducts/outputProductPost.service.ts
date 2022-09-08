import { IOutputProducts, IOutputProductsRequest } from './../../interfaces/outputProducts/outputProducts';
import AppDataSource from './../../data.source';
import { OutputProduct } from '../../entities/outputProduct.entitys';
import { AppError } from '../../errors/AppErros';


const outputProductPostService = async ({name,descriptio,quantity,outputdate,userId,productId}: IOutputProductsRequest): Promise<IOutputProducts> =>{

const outputProductRepository = AppDataSource.getRepository(OutputProduct); 
const outputProductFind = await outputProductRepository.findOneBy({name:name})
const outputProductFindId = await outputProductRepository.findOneBy({id:productId})

if(outputProductFind){
throw new AppError("Product Order already Exists", 400)
}

if(!outputProductFind){
  throw new AppError("Product not found", 404)
  }

if(outputProductFindId){
    if(quantity > 0){
      quantity -= 1
    } else{
      quantity = 0
    throw new AppError("it is necessary to supply",400)
    }
}

    const newOutputProduct = new OutputProduct()
    newOutputProduct.name = name,
    newOutputProduct.descriptio = descriptio,
    newOutputProduct.quantity = quantity,
    newOutputProduct.outputdate = new Date(),
    newOutputProduct.user = userId,
    newOutputProduct.product = productId
    await outputProductRepository.create(newOutputProduct);
    await outputProductRepository.save(newOutputProduct)

    return{
      id: newOutputProduct.id,
      name: newOutputProduct.name,
      descriptio: newOutputProduct.descriptio,
      quantity:  newOutputProduct.quantity, 
      outputdate:  newOutputProduct.outputdate,
      userId: newOutputProduct.user,
      productId: newOutputProduct.product
    }
}

export default outputProductPostService