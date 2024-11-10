export interface IUser {
  id: string;
  name: string;
  email: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: StateEnum;
    postalCode: string;
    country: string;
    complement?: string;
  };
}

export interface IUserCreate {
  name: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: StateEnum;
    postalCode: string;
    country: string;
  };
}

export interface IUserForm {
  name: string;
  email: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export enum StateEnum {
  AC = "Acre",
  AL = "Alagoas",
  AP = "Amapá",
  AM = "Amazonas",
  BA = "Bahia",
  CE = "Ceará",
  DF = "Distrito Federal",
  ES = "Espírito Santo",
  GO = "Goiás",
  MA = "Maranhão",
  MT = "Mato Grosso",
  MS = "Mato Grosso do Sul",
  MG = "Minas Gerais",
  PA = "Pará",
  PB = "Paraíba",
  PR = "Paraná",
  PE = "Pernambuco",
  PI = "Piauí",
  RJ = "Rio de Janeiro",
  RN = "Rio Grande do Norte",
  RS = "Rio Grande do Sul",
  RO = "Rondônia",
  RR = "Roraima",
  SC = "Santa Catarina",
  SP = "São Paulo",
  SE = "Sergipe",
  TO = "Tocantins"
}

