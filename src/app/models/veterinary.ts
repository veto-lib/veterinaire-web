import { AnimalType } from './common';

export interface IVeterinary {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  compatibleAnimals: AnimalType[];
  enabled: boolean;
}

export interface CreateVeterinary {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  compatibleAnimals: AnimalType[];
}

export class Veterinary {
  static fromApiObject(veterinary: IVeterinary): IVeterinary {
    return {
      ...veterinary,
      birthDate: new Date(veterinary.birthDate),
    };
  }
}
