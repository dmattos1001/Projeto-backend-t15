import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProductOrderSchema } from "../interfaces/productOrder/productOrder";

const productOrderSchema: SchemaOf<IProductOrderSchema> = yup.object().shape({
  name: yup.string().required().min(3).max(50),
  quantityOfProducts: yup.string().required(),
  user: yup.string().required(),
  product: yup.string().required(),
});
export { productOrderSchema };
