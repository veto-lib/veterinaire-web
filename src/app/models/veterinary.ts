export interface IVeterinary {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  enabled: boolean;
}

export interface CreateVeterinary {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  price: string;
  address: string;
  gender: 'M' | 'F';
}

export class Veterinary {

  static fromApiObject(veterinary: IVeterinary): IVeterinary {
    return {
      ...veterinary,
      birthDate: new Date(veterinary.birthDate)
    };
  }

}
