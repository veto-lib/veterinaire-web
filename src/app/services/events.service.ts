import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreateEvent, IEvent } from '../models/event';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getMyEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`/doctors/${this.auth.email}/events`).pipe(
      map((events) =>
        events.map((event) => {
          return {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          };
        })
      )
    );
  }

  getEvent(eventId: IEvent['id']): Observable<IEvent> {
    return this.http.get<IEvent>(`/events/${eventId}`).pipe(
      map((event) => {
        return {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        };
      })
    );
  }

  getLastRecentEvents(patientMail: string): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`/patients/${patientMail}/events`).pipe(
      map((events) =>
        events.map((event) => {
          return {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          };
        })
      )
    );
  }

  createEvent(event: CreateEvent): Observable<void> {
    return this.http.post<void>('/events', {
      ...event,
    });
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
