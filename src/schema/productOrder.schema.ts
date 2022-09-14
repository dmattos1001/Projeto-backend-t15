import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProductOrderSchemas } from "../interfaces/productOrder/productOrder";

const productOrderSchema: SchemaOf<IProductOrderSchemas> = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
  quantityOfProducts: yup.string().required(),
  product: yup.string().required(),
});

export default productOrderSchema;
