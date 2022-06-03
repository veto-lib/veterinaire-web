import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IPatient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor() {}

  getMyPatients(): Observable<IPatient[]> {
    return of([
      {
        email: 'hugo.hall',
        firstName: 'Hugo',
        lastName: 'Hall',
        birthDate: '02/01/1992',
        gender: 'F',
        favorite: false,
      },
      {
        email: 'harvey.hugues',
        firstName: 'Harvey',
        lastName: 'Hughes',
        birthDate: '14/04/1993',
        gender: 'M',
        favorite: true,
      },
      {
        email: 'henry.hamilton',
        firstName: 'Henry',
        lastName: 'Hamilton',
        birthDate: '25/07/1982',
        gender: 'M',
        favorite: false,
      },
      {
        email: 'harrison.hernandez',
        firstName: 'Harrison',
        lastName: 'Hernandez',
        birthDate: '12/03/1961',
        gender: 'F',
        favorite: true,
      },
      {
        email: 'hamza.hill',
        firstName: 'Hamza',
        lastName: 'Hill',
        birthDate: '13/02/1958',
        gender: 'M',
        favorite: false,
      },
      {
        email: 'hershel.holmes',
        firstName: 'Hershel',
        lastName: 'Holmes',
        birthDate: '28/01/1945',
        gender: 'F',
        favorite: false,
      },
      {
        email: 'herschel.henderson',
        firstName: 'Herschel',
        lastName: 'Henderson',
        birthDate: '29/07/1978',
        gender: 'F',
        favorite: true,
      },
      {
        email: 'haskel.hunt',
        firstName: 'Haskel',
        lastName: 'Hunt',
        birthDate: '16/12/1970',
        gender: 'M',
        favorite: true,
      },
      {
        email: 'hersh.howard',
        firstName: 'Hersh',
        lastName: 'Howard',
        birthDate: '09/10/1999',
        gender: 'F',
        favorite: false,
      },
    ]);
  }
}
