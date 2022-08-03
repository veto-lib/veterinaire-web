import { Customer, ICustomer } from './customer';

export interface IAnimal {
  id: string;
  name: string;
  birthDate: Date;
  gender: 'M' | 'F';
  owner: ICustomer;
}

export class Animal {
  static fromApiObject(animal: IAnimal): IAnimal {
    return {
      ...animal,
      birthDate: new Date(animal.birthDate),
      owner: Customer.fromApiObject(animal.owner)
    };
  }
}
