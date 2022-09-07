export interface IOutputProducts{
    id:string,
    name: string,
    descriptio:string,
    quantity:number,
    outputdate:Date,
    userId: any,
    productId:any
}

export interface IOutputProductsRequest{
    name: string,
    descriptio:string,
    quantity:number,
    outputdate:Date,
    userId: any,
    productId:any
}