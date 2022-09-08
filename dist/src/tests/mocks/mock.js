"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedProductEntryInvalid = exports.mockedProductEntry = exports.mockedProviderEqualCnpj = exports.mockedProvider = exports.mockedCategory = exports.mockedProduct = exports.mockedProductOrderInvalidId = exports.mockedProductOrder = exports.mockerLoginAdmNv1 = exports.mockerLoginAdmNv2 = exports.mockerLoginAdmNv3 = exports.mockedUserAdmNv1 = exports.mockedUserAdmNv2 = exports.mockedUserAdmNv3 = void 0;
exports.mockedUserAdmNv3 = {
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
exports.mockedUserAdmNv2 = {
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
exports.mockedUserAdmNv1 = {
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
exports.mockerLoginAdmNv3 = {
    cpf: "06053245625",
    password: "3636",
};
exports.mockerLoginAdmNv2 = {
    cpf: "06053345625",
    password: "3636",
};
exports.mockerLoginAdmNv1 = {
    cpf: "06053245626",
    password: "3636",
};
exports.mockedProductOrder = {
    name: "Placa de video",
    quantityOfProducts: 2,
    productId: "15212121",
};
exports.mockedProductOrderInvalidId = {
    name: "Placa de video",
    quantityOfProducts: 2,
    productId: "15212121",
};
exports.mockedProduct = {
    name: "placa de video",
    description: "sdsdsdsdsd",
    value: 5050,
    saleValue: 6500,
    stock: 5,
    criticalStock: 2,
    provider: "",
    category: "",
};
exports.mockedCategory = {
    name: "placas",
    description: "placas em geral",
};
exports.mockedProvider = {
    name: "Megabyte",
    telephone: "1333240499",
    email: "megaByte@mail.com",
    cnpj: "63519017/0001-70",
    address: "Rua Candido Rodrigues - 1082, Centro, São Vicente - SP",
    employee: "Larissa Regina Sales",
    employeeCell: "1333240499",
};
exports.mockedProviderEqualCnpj = {
    name: "Byte",
    telephone: "4599127189",
    email: "byte@mail.com",
    cnpj: "63519017/0001-70",
    address: "Rua President Wilson - 1082, Centro, Santos - SP",
    employee: "Melissa de Souza Rodrigues",
    employeeCell: "1493918890",
};
exports.mockedProductEntry = {
    name: "RTX 3080",
    quantity: 15,
    userId: "1",
    productsId: "A1",
    providerId: "XYZ",
};
exports.mockedProductEntryInvalid = {
    name: "Churros",
    quantity: 5,
    userId: "1",
    productsId: "654321",
    providerId: "XYZ",
};
