import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import * as moment from 'moment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
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

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
      },
    },
  ];

  events: CalendarEvent[] = [
    {
      start: moment().subtract(1, 'd').toDate(),
      end: moment().add(1, 'd').toDate(),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: moment().add(2, 'h').toDate(),
      end: moment().add(4, 'h').toDate(),
      title: 'A draggable and resizable event',
      color: colors.red,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

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
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
}
