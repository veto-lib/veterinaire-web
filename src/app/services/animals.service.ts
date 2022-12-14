import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ICustomer } from '../models/customer';
import { IDocument, Document, CreateDocument } from '../models/document';
import { Animal, IAnimal } from '../models/animal';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  constructor(private http: HttpClient) {}

  getCustomerAnimals(customerEmail: ICustomer['email']): Observable<IAnimal[]> {
    return this.http
      .get<IAnimal[]>(`/customers/${customerEmail}/animals`)
      .pipe(
        map((customers) =>
          customers.map((customer) => Animal.fromApiObject(customer))
        )
      );
  }

  getCustomerAnimal(
    customerEmail: ICustomer['email'],
    animalId: IAnimal['id']
  ): Observable<IAnimal> {
    return this.http
      .get<IAnimal>(`/customers/${customerEmail}/animals/${animalId}`)
      .pipe(map((customer) => Animal.fromApiObject(customer)));
  }

  getAnimalDocuments(
    customerEmail: ICustomer['email'],
    animalId: IAnimal['id']
  ): Observable<IDocument[]> {
    return this.http
      .get<IDocument[]>(
        `/customers/${customerEmail}/animals/${animalId}/documents`
      )
      .pipe(
        map((documents) =>
          documents.map((document) => Document.fromApiObject(document))
        )
      );
  }

  postAnimalDocument(
    customerEmail: ICustomer['email'],
    animalId: IAnimal['id'],
    document: CreateDocument
  ): Observable<IDocument[]> {
    return from(document.file.files[0].text()).pipe(
      switchMap((data) => {
        return this.http.post<IDocument[]>(
          `/customers/${customerEmail}/animals/${animalId}/documents`,
          {
            ...document,
            data,
            file: undefined,
          }
        );
      })
    );
  }
}
