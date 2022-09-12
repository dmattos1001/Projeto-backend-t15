import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProductEntrySchema } from "../interfaces/productEntry";

const productEntrySchema: SchemaOf<IProductEntrySchema> = yup.object().shape({
  name: yup.string().required().min(3).max(50),
  quantity: yup.string().required(),
  productsId: yup.string().required(),
  providerId: yup.string().required(),
});

export { productEntrySchema };
