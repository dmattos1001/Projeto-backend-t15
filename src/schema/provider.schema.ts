import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProviderRequest } from "../interfaces/providers/provider";

const providerSchema: SchemaOf<IProviderRequest> = yup.object().shape({
  name: yup.string().required().max(200).min(5),
  telephone: yup
    .string()
    .matches(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
      "invalid telephone"
    )
    .required(),
  email: yup.string().email().required(),
  cnpj: yup
    .string()
    .matches(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      "invalid CNPJ"
    )
    .required(),
  address: yup.string().required().max(100),
  employee: yup.string().required().max(40).min(3),
  employeeCell: yup
    .string()
    .matches(
      /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/gim,
      "invalid cell"
    )
    .required(),
});

export default providerSchema;
