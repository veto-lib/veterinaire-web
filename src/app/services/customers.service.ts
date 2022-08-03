import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICustomer, Customer } from '../models/customer';
import { IClinic } from '../models/clinic';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getClinicCustomers(clinicId: IClinic['id']): Observable<ICustomer[]> {
    return this.http
      .get<ICustomer[]>(`/clinics/${clinicId}/customers`)
      .pipe(
        map((customers) =>
          customers.map((customer) => Customer.fromApiObject(customer))
        )
      );
  }

  getClinicCustomer(
    clinicId: IClinic['id'],
    customerEmail: ICustomer['email']
  ): Observable<ICustomer> {
    return this.http
      .get<ICustomer>(`/clinics/${clinicId}/customers/${customerEmail}`)
      .pipe(map((customer) => Customer.fromApiObject(customer)));
  }

}
