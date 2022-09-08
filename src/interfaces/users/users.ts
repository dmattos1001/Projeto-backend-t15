interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  administrationNivel: number;
  occupation: string;
  telephone: string;
  cell: string;
  address: IAdressRequest;
  
}

interface IAdressRequest {
  district: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
}

export { IUserRequest, IAdressRequest };
