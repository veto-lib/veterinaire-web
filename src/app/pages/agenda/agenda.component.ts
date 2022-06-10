import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';

import { EventModalComponent } from 'src/app/components/event-modal/event-modal.component';
import { CreateEventModalComponent } from 'src/app/components/create-event-modal/create-event-modal.component';
import { YesNoModalComponent } from 'src/app/components/yes-no-modal/yes-no-modal.component';

import { CreateEvent, IEvent } from 'src/app/models/event';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  styleUrls: ['./agenda.component.less'],
  templateUrl: './agenda.component.html',
})
export class AgendaComponent implements OnInit {
  refresh = new Subject<void>();
  CalendarView = CalendarView;
  viewDate: Date = new Date();

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

  eventClicked(event: CalendarEvent<IEvent>) {
    this.modal
      .open(EventModalComponent, { data: event.meta })
      .afterClosed()
      .subscribe((shouldDelete) => {
        if (shouldDelete) {
          this.deleteEvent(event.meta as IEvent);
        }
      });
  }

  hourClicked(date: Date) {
    this.modal
      .open(CreateEventModalComponent, { data: date, disableClose: true })
      .afterClosed()
      .subscribe((event: CreateEvent | undefined) => {
        if (!!event) {
          this.addEvent(event);
        }
      });
  }

  deleteEvent(eventToDelete: IEvent) {
    this.modal
      .open(YesNoModalComponent, {
        data: 'Voulez-vous vraiment supprimer ce rendez-vous ?',
      })
      .afterClosed()
      .subscribe((data) => {
        if (!!data) {
          this.calendarService.deleteEvent(eventToDelete.id).then((events) => {
            this.events = events;
            this.refresh.next();
          });
        }
      });
  }

  addEvent(event: CreateEvent): void {
    this.calendarService.createEvent(event).then((events) => {
      this.events = events;
      this.refresh.next();
    });
  }
}
