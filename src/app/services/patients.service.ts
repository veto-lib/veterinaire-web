import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IDocument } from '../models/document';
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
        birthDate: new Date('02/01/1992'),
        gender: 'F',
        favorites: [],
      },
      {
        email: 'harvey.hugues',
        firstName: 'Harvey',
        lastName: 'Hughes',
        birthDate: new Date('04/14/1993'),
        gender: 'M',
        favorites: [
          {
            email: 'harvey.hugues',
            firstName: 'Harvey',
            lastName: 'Hughes',
            birthDate: new Date('04/14/1993'),
            gender: 'M',
          },
        ],
      },
      {
        email: 'henry.hamilton',
        firstName: 'Henry',
        lastName: 'Hamilton',
        birthDate: new Date('07/25/1982'),
        gender: 'M',
        favorites: [],
      },
      {
        email: 'harrison.hernandez',
        firstName: 'Harrison',
        lastName: 'Hernandez',
        birthDate: new Date('04/03/1961'),
        gender: 'F',
        favorites: [
          {
            email: 'quentin.caritey@outlook.fr',
            firstName: 'Harvey',
            lastName: 'Hughes',
            birthDate: new Date('04/14/1993'),
            gender: 'M',
          },
        ],
      },
      {
        email: 'hamza.hill',
        firstName: 'Hamza',
        lastName: 'Hill',
        birthDate: new Date('02/13/1958'),
        gender: 'M',
        favorites: [],
      },
      {
        email: 'hershel.holmes',
        firstName: 'Hershel',
        lastName: 'Holmes',
        birthDate: new Date('01/28/1945'),
        gender: 'F',
        favorites: [],
      },
      {
        email: 'herschel.henderson',
        firstName: 'Herschel',
        lastName: 'Henderson',
        birthDate: new Date('07/29/1978'),
        gender: 'F',
        favorites: [
          {
            email: 'harvey.hugues',
            firstName: 'Harvey',
            lastName: 'Hughes',
            birthDate: new Date('04/14/1993'),
            gender: 'M',
          },
          {
            email: 'quentin.caritey@outlook.fr',
            firstName: 'Harvey',
            lastName: 'Hughes',
            birthDate: new Date('04/14/1993'),
            gender: 'M',
          },
        ],
      },
      {
        email: 'haskel.hunt',
        firstName: 'Haskel',
        lastName: 'Hunt',
        birthDate: new Date('12/16/1970'),
        gender: 'M',
        favorites: [
          {
            email: 'harvey.hugues',
            firstName: 'Harvey',
            lastName: 'Hughes',
            birthDate: new Date('04/14/1993'),
            gender: 'M',
          },
        ],
      },
      {
        email: 'hersh.howard',
        firstName: 'Hersh',
        lastName: 'Howard',
        birthDate: new Date('09/10/1999'),
        gender: 'F',
        favorites: [],
      },
    ]);
  }

  getPatient(email: string): Observable<IPatient> {
    return of({
      email: 'hugo.hall',
      firstName: 'Hugo',
      lastName: 'Hall',
      birthDate: new Date('02/01/1992'),
      gender: 'F',
      favorites: [],
    });
  }

  getPatientDocuments(email: string): Observable<IDocument[]> {
    return of([
      {
        name: "Résultat d'examen",
        uploaded: new Date('1/1/16'),
        url: 'http://www.africau.edu/images/default/sample.pdf',
      },
      {
        name: 'Prescription',
        uploaded: new Date('1/17/16'),
        url: 'http://www.africau.edu/images/default/sample.pdf',
      },
      {
        name: 'Arrêt maladie',
        uploaded: new Date('1/28/16'),
        url: 'http://www.africau.edu/images/default/sample.pdf',
      },
    ]);
  }
}
