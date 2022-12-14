interface IOutputProductsSchema {
  name: string;
  descriptio: string;
  quantity: string;
  productId: string;
}
interface IOutputProducts {
  id: string;
  name: string;
  descriptio: string;
  quantity: number;
  userId: any;
  productId: any;
  message?: string | undefined;
}

interface IOutputProductsReq {
  name: string;
  descriptio: string;
  quantity: number;
  userId: any;
  productId: any;

}

interface IOutputProductsRequest {
  name: string;
  descriptio: string;
  quantity: number;
  productId: any;
}

export { IOutputProductsSchema, IOutputProducts, IOutputProductsRequest, IOutputProductsReq };
