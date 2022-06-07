import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IInformation } from '../models/information';

@Injectable({
  providedIn: 'root',
})
export class InformationsService {

  private information: IInformation = {
    firstName: 'Hugo',
    lastName: 'Hall',
    price: '30$',
    address: '3 Melbourne Street, NYC'
  };

  getMyInformation(): Observable<IInformation> {
    return of(this.information);
  }

  updateInformation(information: IInformation): Observable<void> {
    this.information = information;
    return of();
  }
}
