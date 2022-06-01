import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';

import { Event, IEvent } from '../models/event';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private eventService: EventsService) {}

  getMyEvents(): Observable<CalendarEvent<IEvent>[]> {
    return this.eventService.getMyEvents().pipe(
      map(events => Event.toCalendarEvent(events))
    );
  }

  createEvent(event: IEvent): Observable<CalendarEvent<IEvent>[]> {
    return this.eventService.createEvent(event).pipe(
      switchMap(() => this.eventService.getMyEvents()),
      map(events => Event.toCalendarEvent(events))
    );
  }

  deleteEvent(eventId: IEvent['id']): Promise<CalendarEvent<IEvent>[]> {
    return this.eventService.deleteEvent(eventId).toPromise()
      .then(() => this.eventService.getMyEvents().toPromise())
      .then(events => Event.toCalendarEvent(events));
  }
}
