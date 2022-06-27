import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDocument, Document } from '../models/document';
import { IPatient, Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  getMyPatients(): Observable<IPatient[]> {
    return this.http
      .get<IPatient[]>('/doctors/me/patients')
      .pipe(
        map((patients) =>
          patients.map((patient) => Patient.fromApiObject(patient))
        )
      );
  }

  getPatient(email: string): Observable<IPatient> {
    return this.http
      .get<IPatient>(`/doctors/me/patients/${email}`)
      .pipe(map((patient) => Patient.fromApiObject(patient)));
  }

  getPatientDocuments(email: string): Observable<IDocument[]> {
    return this.http
      .get<IDocument[]>(`/patients/${email}/documents`)
      .pipe(
        map((documents) =>
          documents.map((document) => Document.fromApiObject(document))
        )
      );
  }
}
