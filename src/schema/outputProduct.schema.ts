import * as yup from "yup";
import { SchemaOf } from "yup";
import { IOutputProductsSchema } from "../interfaces/outputProducts/outputProducts";

const outputProductSchema: SchemaOf<IOutputProductsSchema> = yup
  .object()
  .shape({
    name: yup.string().required().max(50).min(2),
    descriptio: yup.string().required().max(100).min(10),
    quantity: yup.string().required(),
    productId: yup.string().required(),
  });

export { outputProductSchema };
