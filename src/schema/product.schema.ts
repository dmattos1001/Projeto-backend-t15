import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProductSchema } from "../interfaces/product/product";

const productSchema: SchemaOf<IProductSchema> = yup.object().shape({
  name: yup.string().required().min(3).max(50),
  description: yup.string().required().min(10).max(100),
  value: yup.string().required(),
  saleValue: yup.string().required(),
  stock: yup.string().required(),
  criticalStock: yup.string().required(),
  provider: yup.string().required(),
  category: yup.string().required(),
});

export { productSchema };
