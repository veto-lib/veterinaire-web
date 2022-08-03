import { CalendarEvent } from 'angular-calendar';

import { ICustomer, Customer } from './customer';
import { IVeterinary, Veterinary } from './veterinary';
import { EventReason } from './event-reason';
import { Animal, IAnimal } from './animal';

const CALENDAR_EVENT_COLOR = {
  primary: '#AD2121',
  secondary: '#FAE3E3',
};

export interface IEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  customer: ICustomer;
  animal: IAnimal;
  veterinary: IVeterinary;
  notes: string;
  reason: EventReason;
  callId: string;
}

export interface CreateEvent {
  title: string;
  start: Date;
  end: Date;
  animal: string;
  customer: string;
  veterinary: string;
  notes: string;
  reason: EventReason;
}

export class Event {

  static fromApiObject(event: IEvent): IEvent {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
      animal: Animal.fromApiObject(event.animal),
      customer: Customer.fromApiObject(event.customer),
      veterinary: Veterinary.fromApiObject(event.veterinary)
    };
  }

  static toCalendarEvent(events: IEvent[]): CalendarEvent<IEvent>[] {
    return events.map(e => ({
      start: e.start,
      end: e.end,
      title: e.title,
      reason: e.reason,

      color: CALENDAR_EVENT_COLOR,
      allDay: false,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
      meta: e
    }));
  }

}
