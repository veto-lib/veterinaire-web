import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
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
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agenda.component.less'],
  templateUrl: './agenda.component.html',
})
export class AgendaComponent implements OnInit {
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

  events: CalendarEvent<IEvent>[] = [];

  constructor(
    private modal: MatDialog,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.calendarService.getMyEvents().subscribe((events) => {
      this.events = events;
    });
  }

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
    this.calendarService
      .createEvent({
        id: 3,
        title: 'new event',
        start: moment().add(6, 'h').toDate(),
        end: moment().add(8, 'h').toDate(),
        notes: 'some notes about the meeting...',
        callId: 'test',
        patient: {
          firstName: 'Harvey',
          lastName: 'Hughes',
          birthDate: '14/04/1993',
          gender: 'M',
          favorite: true,
        },
      })
      .subscribe((events) => (this.events = events));
  }

  handleEvent(event: CalendarEvent<IEvent>) {
    this.modal
      .open(EventModalComponent, { data: event.meta })
      .afterClosed()
      .subscribe((shouldDelete) => {
        if (shouldDelete) {
          this.deleteEvent(event.meta as IEvent);
        }
      });
  }

  deleteEvent(eventToDelete: IEvent) {
    this.calendarService
      .deleteEvent(eventToDelete.id)
      .then((events) => {
        this.events = events;
        this.activeDayIsOpen = false;
        this.refresh.next();
      });
  }
}
