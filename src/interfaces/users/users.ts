interface IUser {
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
export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  cpf: string;
  administrationNivel: string;
  occupation: string;
  telephone?: string;
  cell: string;
  address: IAdressRequest;
}
interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  administrationNivel: number;
  occupation: string;
  telephone: string;
  cell: string;
  address?: IAdressRequest;
}

interface IAdressRequest {
  district: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
}

export { IUserRequest, IAdressRequest, IUser };
