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

  getClinicInformations(): Observable<IClinic> {
    return this.http.get<IClinic>(`/clinic`).pipe(
      map(clinic => Clinic.fromApiObject(clinic))
    );
  }

  updateClinicInformations(clinic: IClinic): Observable<void> {
    return this.http.patch<void>(`/clinic`, clinic);
  }
}
