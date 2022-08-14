import { Animal, IAnimal } from './animal';

export interface ICustomer {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  phone: string;
  animals: IAnimal[];
  kind: 'customer';
}

export class Customer {

  static fromApiObject(customer: ICustomer): ICustomer {
    return {
      ...customer,
      birthDate: new Date(customer.birthDate),
      kind: 'customer',
      animals: customer?.animals?.map(a => Animal.fromApiObject(a)) ?? [],
    };
  }

}
