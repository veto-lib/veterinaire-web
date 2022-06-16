import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as moment from 'moment';

import { CreateEvent, IEvent } from '../models/event';

const randomString = () => (Math.random() + 1).toString(36).substring(7);

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}

  private events: IEvent[] = [
    {
      id: randomString(),
      title: 'A 3 day event',
      start: moment().subtract(4, 'h').toDate(),
      end: moment().subtract(2, 'h').toDate(),
      notes: 'some notes about the meeting...',
      callId: randomString(),
      patient: {
        email: 'hugo.hall',
        firstName: 'Hugo',
        lastName: 'Hall',
        birthDate: new Date('02/01/1992'),
        gender: 'F',
        favorite: false,
      },
      doctor: {
        email: 'huguette.hall',
        firstName: 'Huguette',
        lastName: 'Hall',
        birthDate: new Date('02/01/1991'),
        gender: 'F',
      }
    },
    {
      id: randomString(),
      title: 'A draggable and resizable event',
      start: moment().add(2, 'h').toDate(),
      end: moment().add(4, 'h').toDate(),
      notes: 'some notes about the meeting...',
      callId: randomString(),
      patient: {
        email: 'harvey.hugues',
        firstName: 'Harvey',
        lastName: 'Hughes',
        birthDate: new Date('14/04/1993'),
        gender: 'M',
        favorite: true,
      },
      doctor: {
        email: 'huguette.hall',
        firstName: 'Huguette',
        lastName: 'Hall',
        birthDate: new Date('02/01/1991'),
        gender: 'F',
      }
    },
  ];

  getMyEvents(): Observable<IEvent[]> {
    return of(this.events);
  }

  getEvent(eventId: IEvent['id']): Observable<IEvent> {
    return of(this.events).pipe(
      map(events => events.find(e => e.id === eventId) as IEvent)
    );
  }

  getLastRecentEvents(patientMail: string): Observable<IEvent[]> {
    return of(this.events).pipe(
      take(3)
    );
  }

  createEvent(event: CreateEvent): Observable<void> {
    this.events.push({
      id: randomString(),
      callId: randomString(),
      ...event,
      patient: {
        email: 'hugo.hall',
        firstName: 'Hugo',
        lastName: 'Hall',
        birthDate: new Date('02/01/1992'),
        gender: 'F',
        favorite: false,
      },
      doctor: {
        email: 'huguette.hall',
        firstName: 'Huguette',
        lastName: 'Hall',
        birthDate: new Date('02/01/1991'),
        gender: 'F',
      }
    });
    return of();
  }

  updateNotes(eventId: IEvent['id'], notes: string): Observable<void> {
    const event = this.events.find(e => e.id === eventId) as IEvent;
    event.notes = notes;
    return of();
  }

  deleteEvent(eventId: IEvent['id']): Observable<void> {
    this.events = this.events.filter((e) => e.id !== eventId);
    return of();
  }
}
