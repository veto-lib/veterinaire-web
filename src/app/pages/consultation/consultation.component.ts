import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';

import { IEvent } from 'src/app/models/event';

import { EventsService } from 'src/app/services/events.service';

@Component({
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.less'],
})
export class ConsultationComponent implements OnInit {
  event: IEvent;
  notes = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId') ?? '';
    this.eventsService
      .getEvent(eventId)
      .subscribe((event) => (this.event = event));
  }

  get doctorName() {
    return `${this.event.doctor.firstName} ${this.event.doctor.lastName}`;
  }

  get callUrl() {
    return `${environment.p2p}/${this.event.callId}/${encodeURI(this.doctorName)}`;
  }

  get canSave(): boolean {
    return this.notes.dirty;
  }

  save() {
    this.notes.markAsPristine();
    this.eventsService.updateNotes(this.event.id, this.notes.value).subscribe();
  }
}
