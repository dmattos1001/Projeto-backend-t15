export interface IUserRequest {
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

export interface IAdressRequest {
  district: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
}