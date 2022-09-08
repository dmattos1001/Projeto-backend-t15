import { IOutputProductsRequest } from "../../interfaces/outputProducts/outputProducts";
import { IProductEntryRequest } from "../../interfaces/productEntry";
import { IProductOrderRequest } from "../../interfaces/productOrder/productOrder";
import { IProviderRequest } from "../../interfaces/providers/provider";
import { ISessionsResquest } from "../../interfaces/sessions/sessions";
import { IUserRequest } from "../../interfaces/users/users";
export const mockedUserAdmNv3: IUserRequest = {
  name: "hitalo",
  email: "hitaloMenorLucas@gmail.com",
  password: "3636",
  cpf: "06053245625",
  administrationNivel: 3,
  occupation: "senior",
  telephone: "6133658755",
  cell: "61994133544",
  address: {
    district: "Rua Heleodo Pires de camargo",
    zipCode: "72215093",
    number: "67",
    city: "Piedade",
    state: "SP",
  },
};
export const mockedUserAdmNv2: IUserRequest = {
  name: "hitalo",
  email: "hitaloMenoLucas@gmail.com",
  password: "3636",
  cpf: "06053345625",
  administrationNivel: 2,
  occupation: "senior",
  telephone: "6133658755",
  cell: "61994133544",
  address: {
    district: "Rua Heleodo Pires de camargo",
    zipCode: "72215093",
    number: "67",
    city: "Piedade",
    state: "SP",
  },
};
export const mockedUserAdmNv1: IUserRequest = {
  name: "hitalo",
  email: "hitaloMeLucas@gmail.com",
  password: "3636",
  cpf: "06053245626",
  administrationNivel: 1,
  occupation: "senior",
  telephone: "6133658755",
  cell: "61994133544",
  address: {
    district: "Rua Heleodo Pires de camargo",
    zipCode: "72215093",
    number: "67",
    city: "Piedade",
    state: "SP",
  },
};
export const mockerLoginAdmNv3: ISessionsResquest = {
  cpf: "06053245625",
  password: "3636",
};
export const mockerLoginAdmNv2: ISessionsResquest = {
  cpf: "06053345625",
  password: "3636",
};
export const mockerLoginAdmNv1: ISessionsResquest = {
  cpf: "06053245626",
  password: "3636",
};
export const mockedProductOrder: IProductOrderRequest = {
  name: "Placa de video",
  quantityOfProducts: 2,
  providerId: "15212121",
};
export const mockedProductOrderInvalidId: IProductOrderRequest = {
  name: "Placa de video",
  quantityOfProducts: 2,
  providerId: "15212121",
};
export const mockedProvider: IProviderRequest = {
  name: "Megabyte",
  telephone: "1333240499",
  email: "megaByte@mail.com",
  cnpj: "63519017/0001-70",
  address: "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
  employee: "Larissa Regina Sales",
  employeeCell: "1333240499",
};

export const mockedProviderEqualCnpj: IProviderRequest = {
  name: "Byte",
  telephone: "4599127189",
  email: "byte@mail.com",
  cnpj: "63519017/0001-70",
  address: "Rua President Wilson - 1082, Centro, Santos - SP",
  employee: "Melissa de Souza Rodrigues",
  employeeCell: "1493918890",
};

export const mockedProductEntry: IProductEntryRequest = {
  name: "RTX 3080",
  quantity: 15,
  userId: "1",
  productsId: "A1",
  providerId: "XYZ",
};

export const mockedProductEntryInvalid: IProductEntryRequest = {
  name: "Churros",
  quantity: 5,
  userId: "1",
  productsId: "654321",
  providerId: "XYZ",
};