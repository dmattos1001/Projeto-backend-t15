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
export interface IProductSchema {
  name: string;
  description: string;
  value: string;
  saleValue: string;
  stock: string;
  criticalStock: string;
  provider: string;
  category: string;
}
