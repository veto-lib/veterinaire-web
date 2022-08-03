import { Animal, IAnimal } from './animal';
import { Clinic, IClinic } from './clinic';

export interface ICustomer {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  phone: string;
  clinics: IClinic[];
  animals: IAnimal[];
}

export class Customer {

  static fromApiObject(customer: ICustomer): ICustomer {
    return {
      ...customer,
      birthDate: new Date(customer.birthDate),
      clinics: customer?.clinics?.map(c => Clinic.fromApiObject(c)) ?? [],
      animals: customer?.animals?.map(a => Animal.fromApiObject(a)) ?? [],
    };
  }

}
