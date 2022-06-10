import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEvent } from 'src/app/models/event';
import { IPatient } from 'src/app/models/patient';
import { EventsService } from 'src/app/services/events.service';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less'],
})
export class RecordComponent implements OnInit {
  constructor(
    private patientsService: PatientsService,
    private eventService: EventsService,
    private route: ActivatedRoute
  ) {}

  patient: IPatient;
  events: IEvent[] = [];

  ngOnInit(): void {
    const patientMail = this.route.snapshot.paramMap.get('patientMail') ?? '';
    this.patientsService.getMyPatient(patientMail).subscribe((patient) => {
      this.patient = patient;
    });
    this.eventService.getLastRecentEvents(patientMail).subscribe((events) => {
      this.events = events;
    });
  }

  documents = [
    {
      name: 'Résultat d\'examen',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Prescription',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Arrêt maladie',
      updated: new Date('1/28/16'),
    },
  ];

}
