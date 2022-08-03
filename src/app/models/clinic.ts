import { AnimalType } from './animal-type';

export interface IClinic {
  id: string;
  name: string;
  address: string;
  openingHours: string;
  compatibleAnimals: AnimalType[];
}

export class Clinic {
  static fromApiObject(clinic: IClinic): IClinic {
    return {
      id: clinic.id,
      name: clinic.name,
      address: clinic.address,
      openingHours: clinic.openingHours,
      compatibleAnimals: clinic.compatibleAnimals
    };
  }
}
