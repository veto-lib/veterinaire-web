import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';

import { CreateEvent, Event, IEvent } from '../models/event';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private eventService: EventsService) {}

  getMyEvents(): Observable<CalendarEvent<IEvent>[]> {
    return this.eventService
      .getMyEvents()
      .pipe(map((events) => Event.toCalendarEvent(events)));
  }

  createEvent(event: CreateEvent): Observable<CalendarEvent<IEvent>[]> {
    return this.eventService.createEvent(event).pipe(
      switchMap(() => this.eventService.getMyEvents()),
      map((events) => Event.toCalendarEvent(events))
    );
  }

  deleteEvent(eventId: IEvent['id']): Observable<CalendarEvent<IEvent>[]> {
    return this.eventService.deleteEvent(eventId).pipe(
      switchMap(() => this.eventService.getMyEvents()),
      map((events) => Event.toCalendarEvent(events))
    );
  }
}
