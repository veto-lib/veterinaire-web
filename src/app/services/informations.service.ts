import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IInformation, Information } from '../models/information';

@Injectable({
  providedIn: 'root',
})
export class InformationsService {
  constructor(private http: HttpClient) {}

  getMyInformation(): Observable<IInformation> {
    return this.http.get<IInformation>('/doctors/me').pipe(
      map(information => Information.fromApi(information))
    );
  }

  updateInformation(information: IInformation): Observable<void> {
    return this.http.patch<void>('/doctors/me', information);
  }
}
