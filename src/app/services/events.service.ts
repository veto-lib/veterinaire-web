import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreateEvent, IEvent, Event } from '../models/event';
import { AuthService } from './auth.service';
import { ICustomer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getMyEvents(): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(`/veterinaries/${this.auth.email}/events`)
      .pipe(map((events) => events.map((event) => Event.fromApiObject(event))));
  }

  getEvent(eventId: IEvent['id']): Observable<IEvent> {
    return this.http
      .get<IEvent>(`/events/${eventId}`)
      .pipe(map((event) => Event.fromApiObject(event)));
  }

  getLastRecentEvents(customerEmail: ICustomer['email']): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>(`/customers/${customerEmail}/events`)
      .pipe(map((events) => events.map((event) => Event.fromApiObject(event))));
  }

  createEvent(event: CreateEvent): Observable<void> {
    return this.http.post<void>('/events', event);
  }

  updateNotes(eventId: IEvent['id'], notes: string): Observable<void> {
    return this.http.patch<void>(`/events/${eventId}`, {
      notes,
    });
  }

  deleteEvent(eventId: IEvent['id']): Observable<void> {
    return this.http.delete<void>(`/events/${eventId}`);
  }
}
