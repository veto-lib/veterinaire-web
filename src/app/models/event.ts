import { CalendarEvent } from 'angular-calendar';

import { IPatient, Patient } from './patient';
import { IDoctor, Doctor } from './doctor';

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
  doctor: IDoctor
  notes: string;
  callId: string;
}

export interface CreateEvent {
  title: string;
  start: Date;
  end: Date;
  patient: string;
  doctor: string;
  notes: string;
}

export class Event {

  static fromApiObject(event: IEvent): IEvent {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
      patient: Patient.fromApiObject(event.patient),
      doctor: Doctor.fromApiObject(event.doctor)
    };
  }

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
