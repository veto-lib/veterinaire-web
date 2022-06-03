import { CalendarEvent } from 'angular-calendar';

import { IPatient } from './patient';

const CALENDAR_EVENT_COLOR = {
  primary: '#AD2121',
  secondary: '#FAE3E3',
};

export interface IEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  patient: IPatient;
  notes: string;
  callId: string;
}

export interface CreateEvent {
  title: string;
  start: Date;
  end: Date;
  patient: string;
  notes: string;
}

export class Event {

  static toCalendarEvent(events: IEvent[]): CalendarEvent<IEvent>[] {
    return events.map(e => ({
      start: e.start,
      end: e.end,
      title: e.title,
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
