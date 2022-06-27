export interface IDoctor {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
}

export class Doctor {

  static fromApiObject(doctor: IDoctor): IDoctor {
    return {
      ...doctor,
      birthDate: new Date(doctor.birthDate)
    };
  }

}
