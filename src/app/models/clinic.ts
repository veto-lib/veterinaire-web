import { AnimalType, Hours, PaymentMeans } from './common';

export interface IClinic {
  name: string;
  address: string;
  phone: string;
  openingHours: Hours;
  compatibleAnimals: AnimalType[];
  paymentMeans: PaymentMeans;
}

export class Clinic {
  static fromApiObject(clinic: IClinic): IClinic {
    return {
      ...clinic,
    };
  }
}
