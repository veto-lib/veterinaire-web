export interface IDoctor {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  enabled: boolean;
}

export interface CreateDoctor {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  price: string;
  address: string;
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
