import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IClinic, Clinic } from '../models/clinic';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  constructor(private http: HttpClient) {}

  getClinicInformations(clinicId: IClinic['id']): Observable<IClinic> {
    return this.http.get<IClinic>(`/clinics/${clinicId}`).pipe(
      map(clinic => Clinic.fromApiObject(clinic))
    );
  }

  updateClinicInformations(clinicId: IClinic['id'], clinic: IClinic): Observable<void> {
    return this.http.patch<void>(`/clinics/${clinicId}`, clinic);
  }
}
