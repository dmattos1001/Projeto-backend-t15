import { Product } from "../../entities/product.entitys";
import { Provider } from "../../entities/provider.entitys";
import { User } from "../../entities/user.entitys";

export interface IProductEntryRequest {
  name: string;
  quantity: number;
  userId: string;
  productsId: string;
  providerId: string;
}
export interface IProductEntrySchema {
  name: string;
  quantity: string;
  productsId: string;
  providerId: string;
}
export interface IProductEntry {
  id: string;
  name: string;
  receivedD: string;
  quantity: number;
  user: User;
  product: Product;
  provider: Provider;
}
