import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreateVeterinary, IVeterinary, Veterinary } from '../models/veterinary';

@Injectable({
  providedIn: 'root',
})
export class VeterinariesService {
  constructor(private http: HttpClient) {}

  findOne(email: string): Observable<IVeterinary> {
    return this.http
      .get<IVeterinary>(`/veterinaries/${email}`)
      .pipe(map((veterinary) => Veterinary.fromApiObject(veterinary)));
  }

  create(veterinary: CreateVeterinary): Observable<void> {
    return this.http.post<void>('/veterinaries', veterinary);
  }
}
