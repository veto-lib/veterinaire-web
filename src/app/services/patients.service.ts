import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor() {}

  getMyPatients(): Observable<Patient[]> {
    return of([
      {
        firstName: 'Hugo',
        lastName: 'Hall',
        birthDate: '02/01/1992',
        gender: 'F',
        favorite: false,
      },
      {
        firstName: 'Harvey',
        lastName: 'Hughes',
        birthDate: '14/04/1993',
        gender: 'M',
        favorite: true,
      },
      {
        firstName: 'Henry',
        lastName: 'Hamilton',
        birthDate: '25/07/1982',
        gender: 'M',
        favorite: false,
      },
      {
        firstName: 'Harrison',
        lastName: 'Hernandez',
        birthDate: '12/03/1961',
        gender: 'F',
        favorite: true,
      },
      {
        firstName: 'Hamza',
        lastName: 'Hill',
        birthDate: '13/02/1958',
        gender: 'M',
        favorite: false,
      },
      {
        firstName: 'Hershel',
        lastName: 'Holmes',
        birthDate: '28/01/1945',
        gender: 'F',
        favorite: false,
      },
      {
        firstName: 'Herschel',
        lastName: 'Henderson',
        birthDate: '29/07/1978',
        gender: 'F',
        favorite: true,
      },
      {
        firstName: 'Haskel',
        lastName: 'Hunt',
        birthDate: '16/12/1970',
        gender: 'M',
        favorite: true,
      },
      {
        firstName: 'Hersh',
        lastName: 'Howard',
        birthDate: '09/10/1999',
        gender: 'F',
        favorite: false,
      },
    ]);
  }
}
