import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICategoryRequest } from "../interfaces/category/category";

const categorySchema: SchemaOf<ICategoryRequest> = yup.object().shape({
  name: yup.string().required().min(5).max(50),
  description: yup.string().required().min(3).max(200),
});

export { categorySchema };
