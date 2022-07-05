import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdmin } from '../models/admin';
import { Doctor, IDoctor } from '../models/doctor';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  findOne(email: string): Observable<IAdmin> {
    return this.http.get<IAdmin>(`/admin/${email}`);
  }

  findAllUnvalidated(): Observable<IDoctor[]> {
    return this.http
      .get<IDoctor[]>('/admin/doctors')
      .pipe(
        map((doctors) => doctors.map((doctor) => Doctor.fromApiObject(doctor)))
      );
  }

  validateDoctor(email: string): Observable<void> {
    return this.http.patch<void>(`/admin/doctors/${email}`, {});
  }
}
