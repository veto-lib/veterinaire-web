import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import * as moment from 'moment';

import { EventModalComponent } from 'src/app/components/event-modal/event-modal.component';
import { IEvent } from 'src/app/models/event';

const RED = {
  primary: '#ad2121',
  secondary: '#FAE3E3',
};

@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agenda.component.less'],
  templateUrl: './agenda.component.html',
})
export class AgendaComponent {
  refresh = new Subject<void>();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  setView(view: CalendarView) {
    this.view = view;
  }

  activeDayIsOpen: boolean = true;
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  events: CalendarEvent<IEvent>[] = [
    {
      start: moment().subtract(1, 'd').toDate(),
      end: moment().add(1, 'd').toDate(),
      title: 'A 3 day event',
      color: RED,
      allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
      meta: {
        id: 1,
        title: 'A 3 day event',
        start: moment().subtract(1, 'd').toDate(),
        end: moment().add(1, 'd').toDate(),
        allDay: true,
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
    },
    {
      start: moment().add(2, 'h').toDate(),
      end: moment().add(4, 'h').toDate(),
      title: 'A draggable and resizable event',
      color: RED,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
      meta: {
        id: 2,
        title: 'A draggable and resizable event',
        start: moment().add(2, 'h').toDate(),
        end: moment().add(4, 'h').toDate(),
        allDay: false,
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
    },
  ];

  constructor(private modal: MatDialog) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.activeDayIsOpen = !(
      (moment(date).isSame(this.viewDate, 'day') &&
        this.activeDayIsOpen === true) ||
      events.length === 0
    );
    if (moment(date).isSame(this.viewDate, 'month')) {
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: moment().toDate(),
        end: moment().add(2, 'h').toDate(),
        color: RED,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
      },
    ];
  }

  handleEvent(event: CalendarEvent<Event>) {
    this.modal.open(EventModalComponent, { data: event.meta });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
}
