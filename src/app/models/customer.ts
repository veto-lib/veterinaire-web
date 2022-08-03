import { Animal, IAnimal } from './animal';

export interface ICustomer {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  phone: string;
  animals: IAnimal[];
}

export class Customer {

  static fromApiObject(customer: ICustomer): ICustomer {
    return {
      ...customer,
      birthDate: new Date(customer.birthDate),
      animals: customer?.animals?.map(a => Animal.fromApiObject(a)) ?? [],
    };
  }

}
