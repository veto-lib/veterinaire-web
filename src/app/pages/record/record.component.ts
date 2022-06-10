import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { IDocument } from 'src/app/models/document';
import { IEvent } from 'src/app/models/event';
import { IPatient } from 'src/app/models/patient';

import { EventsService } from 'src/app/services/events.service';
import { PatientsService } from 'src/app/services/patients.service';

import { VisualizeNotesModalComponent } from 'src/app/components/visualize-notes-modal/visualize-notes-modal.component';

@Component({
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less'],
})
export class RecordComponent implements OnInit {
  constructor(
    private patientsService: PatientsService,
    private eventService: EventsService,
    private modal: MatDialog,
    private route: ActivatedRoute
  ) {}

  patient: IPatient;
  events: IEvent[] = [];
  documents: IDocument[] = [];

  ngOnInit(): void {
    const patientMail = this.route.snapshot.paramMap.get('patientMail') ?? '';
    this.patientsService.getMyPatient(patientMail).subscribe((patient) => {
      this.patient = patient;
    });
    this.patientsService.getPatientDocuments(patientMail).subscribe(documents => {
      this.documents = documents;
    });
    this.eventService.getLastRecentEvents(patientMail).subscribe((events) => {
      this.events = events;
    });
  }

  visualize(event: IEvent) {
    this.modal.open(VisualizeNotesModalComponent, { data: event });
  }
}
