import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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
    private eventService: EventsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId') ?? '';
    this.eventService
      .getEvent(eventId)
      .subscribe((event) => (this.event = event));
  }

  get doctorName() {
    return `${this.event.doctor.firstName} ${this.event.doctor.lastName}`;
  }

  get callUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `http://localhost:3000/${this.event.id}/${encodeURI(this.doctorName)}`
    );
  }
}
