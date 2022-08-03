import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICustomer, Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getClinicCustomers(): Observable<ICustomer[]> {
    return this.http
      .get<ICustomer[]>(`/customers`)
      .pipe(
        map((customers) =>
          customers.map((customer) => Customer.fromApiObject(customer))
        )
      );
  }

  getClinicCustomer(customerEmail: ICustomer['email']): Observable<ICustomer> {
    return this.http
      .get<ICustomer>(`/customers/${customerEmail}`)
      .pipe(map((customer) => Customer.fromApiObject(customer)));
  }
}
