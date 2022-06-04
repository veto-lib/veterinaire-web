import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';

import { IPatient } from 'src/app/models/patient';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.less'],
})
export class CreateEventModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public date: Date,
    private fb: FormBuilder,
    private patientsService: PatientsService
  ) {}

  patients: IPatient[] = [];

  form = this.fb.group(
    {
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      patient: ['', Validators.required],
      notes: ['', Validators.required],
    },
    {
      validators: [this.endDateAfterStartDate],
    }
  );

  ngOnInit() {
    this.patientsService
      .getMyPatients()
      .subscribe((patients) => (this.patients = patients));
    this.form.controls['start'].setValue(this.date);
    this.form.controls['end'].setValue(moment(this.date).add(1, 'h').toDate());
  }

  endDateAfterStartDate(group: AbstractControl): ValidationErrors | null {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    return !!start && !!end && moment(start).isBefore(moment(end))
      ? null
      : { endBeforeStart: 'error' };
  }
}
