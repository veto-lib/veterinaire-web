import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import * as moment from 'moment';

import { IEvent } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}

  private events: IEvent[] = [
    {
      id: 1,
      title: 'A 3 day event',
      start: moment().subtract(4, 'h').toDate(),
      end: moment().subtract(2, 'h').toDate(),
      notes: 'some notes about the meeting...',
      callId: 'test',
      patient: {
        firstName: 'Hugo',
        lastName: 'Hall',
        birthDate: '02/01/1992',
        gender: 'F',
        favorite: false,
      },
    },
    {
      id: 2,
      title: 'A draggable and resizable event',
      start: moment().add(2, 'h').toDate(),
      end: moment().add(4, 'h').toDate(),
      notes: 'some notes about the meeting...',
      callId: 'test',
      patient: {
        firstName: 'Harvey',
        lastName: 'Hughes',
        birthDate: '14/04/1993',
        gender: 'M',
        favorite: true,
      },
    },
  ];

  getMyEvents(): Observable<IEvent[]> {
    return of(this.events);
  }

  createEvent(event: IEvent): Observable<void> {
    this.events.push(event);
    return of();
  }

  deleteEvent(eventId: IEvent['id']): Observable<void> {
    this.events = this.events.filter((e) => e.id !== eventId);
    return of();
  }
}
