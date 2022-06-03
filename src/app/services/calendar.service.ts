import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';

import { CreateEvent, Event, IEvent } from '../models/event';
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

  async createEvent(event: CreateEvent): Promise<CalendarEvent<IEvent>[]> {
    return this.eventService.createEvent(event).toPromise()
      .then(() => this.eventService.getMyEvents().toPromise())
      .then(events => Event.toCalendarEvent(events));
  }

  async deleteEvent(eventId: IEvent['id']): Promise<CalendarEvent<IEvent>[]> {
    return this.eventService.deleteEvent(eventId).toPromise()
      .then(() => this.eventService.getMyEvents().toPromise())
      .then(events => Event.toCalendarEvent(events));
  }
}
