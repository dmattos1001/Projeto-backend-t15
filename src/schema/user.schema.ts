import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserSchema } from "../interfaces/users/users";

const userSchema: SchemaOf<IUserSchema> = yup.object().shape({
  name: yup.string().max(50).min(3).required(),
  email: yup.string().email().required(),
  cpf: yup
    .string()
    .matches(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/, "CPF invalid")
    .required(),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#-])[0-9a-zA-Z$*&@#-]{8,}$/,
      "the password must contain at least one digit, one lowercase letter, one uppercase letter,at least one special character, at least 8 of the characters mentioned"
    )
    .max(16)
    .required(),
  administrationNivel: yup.string().required(),
  occupation: yup.string().max(50).min(3).required(),
  cell: yup
    .string()
    .matches(
      /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/gim,
      "invalid cell"
    )
    .required(),
  telephone: yup
    .string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      "invalid telephone"
    )
    .required(),
  address: yup.object().shape({
    district: yup.string().required(),
    zipCode: yup
      .string()
      .matches(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/, "invalid zipCode")
      .required(),
    number: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required().max(2),
  }),
});
export { userSchema };
