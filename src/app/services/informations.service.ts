import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IInformation } from '../models/information';

@Injectable({
  providedIn: 'root',
})
export class InformationsService {
  constructor(private http: HttpClient) {}

  getMyInformation(): Observable<IInformation> {
    return this.http.get<IInformation>('/doctors/me');
  }

  updateInformation(information: IInformation): Observable<void> {
    return this.http.patch<void>('/doctors/me', information);
  }
}
