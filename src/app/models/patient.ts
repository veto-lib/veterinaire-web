import { IDoctor, Doctor } from './doctor';

export interface IPatient {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  favorites: IDoctor[];
}

export class Patient {

  static fromApiObject(patient: IPatient): IPatient {
    return {
      ...patient,
      birthDate: new Date(patient.birthDate),
      favorites: patient?.favorites?.map(p => Doctor.fromApiObject(p)) ?? []
    };
  }

}
