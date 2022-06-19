import { IDoctor } from './doctor';

export interface IPatient {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  favorites: IDoctor[];
}
