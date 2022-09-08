import { Category } from "../../entities/category.entitys";
import { Provider } from "../../entities/provider.entitys";

export interface IProduct {
   
    name: string;
    description: string;
    value: number;
    saleValue: number;
    stock: number;
    criticalStock: number;
    provider: string;
    category: string;

}