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
        birthDate: '04/14/1993',
        gender: 'M',
        favorite: true,
      },
      {
        email: 'henry.hamilton',
        firstName: 'Henry',
        lastName: 'Hamilton',
        birthDate: '07/25/1982',
        gender: 'M',
        favorite: false,
      },
      {
        email: 'harrison.hernandez',
        firstName: 'Harrison',
        lastName: 'Hernandez',
        birthDate: '04/03/1961',
        gender: 'F',
        favorite: true,
      },
      {
        email: 'hamza.hill',
        firstName: 'Hamza',
        lastName: 'Hill',
        birthDate: '02/13/1958',
        gender: 'M',
        favorite: false,
      },
      {
        email: 'hershel.holmes',
        firstName: 'Hershel',
        lastName: 'Holmes',
        birthDate: '01/28/1945',
        gender: 'F',
        favorite: false,
      },
      {
        email: 'herschel.henderson',
        firstName: 'Herschel',
        lastName: 'Henderson',
        birthDate: '07/29/1978',
        gender: 'F',
        favorite: true,
      },
      {
        email: 'haskel.hunt',
        firstName: 'Haskel',
        lastName: 'Hunt',
        birthDate: '12/16/1970',
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

  getMyPatient(email: string): Observable<IPatient> {
    return of({
      email: 'hugo.hall',
      firstName: 'Hugo',
      lastName: 'Hall',
      birthDate: '02/01/1992',
      gender: 'F',
      favorite: false,
    });
  }
}
