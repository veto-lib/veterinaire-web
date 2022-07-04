import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreateDoctor, Doctor, IDoctor } from '../models/doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  findOne(email: string): Observable<IDoctor> {
    return this.http
      .get<IDoctor>(`/doctors/${email}`)
      .pipe(map((doctor) => Doctor.fromApiObject(doctor)));
  }

  create(doctor: CreateDoctor): Observable<void> {
    return this.http.post<void>('/doctors', doctor);
  }
}
