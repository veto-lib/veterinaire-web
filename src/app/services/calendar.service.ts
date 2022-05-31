import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
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
      mergeMap(() => this.eventService.getMyEvents()),
      map(events => Event.toCalendarEvent(events))
    );
  }

  deleteEvent(eventId: IEvent['id']): Observable<CalendarEvent<IEvent>[]> {
    return this.eventService.deleteEvent(eventId).pipe(
      mergeMap(() => this.eventService.getMyEvents()),
      map(events => Event.toCalendarEvent(events))
    );
  }
}
