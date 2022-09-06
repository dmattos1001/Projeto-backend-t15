import { IProviderRequest } from "../../interfaces/providers/provider";

export const mockedProvider : IProviderRequest = {
    name: "Megabyte",
    telephone: "1333240499",
    email: "megaByte@mail.com",
    cnpj: "63519017/0001-70",
    address: "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
    employee: "Larissa Regina Sales",
    employeeCell: "1333240499"
}

export const mockedProviderEqualCnpj : IProviderRequest = {
    name: "Byte",
    telephone: "4599127189",
    email: "byte@mail.com",
    cnpj: "63519017/0001-70",
    address: "Rua President Wilson - 1082, Centro, Santos - SP",
    employee: "Melissa de Souza Rodrigues",
    employeeCell: "1493918890"
}