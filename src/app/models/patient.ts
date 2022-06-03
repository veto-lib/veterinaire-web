export interface IPatient {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: 'M' | 'F';
  favorite: boolean;
}
