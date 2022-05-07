import { Component, OnInit } from '@angular/core';

import { PatientsService } from 'src/app/services/patients.service';

import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.less'],
})
export class PatientsComponent implements OnInit {

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'gender',
    'favorite',
  ];

  patients: Patient[] = [];

  constructor(private service: PatientsService) {}

  ngOnInit(): void {
    this.service.getMyPatients().subscribe(patients => {
      this.patients = patients;
    });
  }
}
