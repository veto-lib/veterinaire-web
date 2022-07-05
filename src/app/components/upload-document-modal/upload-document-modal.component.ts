import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IPatient } from 'src/app/models/patient';
import { CreateDocument } from 'src/app/models/document';

import { PatientsService } from 'src/app/services/patients.service';

@Component({
  templateUrl: './upload-document-modal.component.html',
  styleUrls: ['./upload-document-modal.component.less'],
})
export class UploadDocumentModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public date: Date,
    private fb: FormBuilder,
    private patientsService: PatientsService,
  ) {}

  patients: IPatient[] = [];

  form = this.fb.group(
    {
      name: ['', Validators.required],
      file: ['', Validators.required],
      patient: ['', Validators.required],
    }
  );

  ngOnInit() {
    this.patientsService
      .getMyPatients()
      .subscribe((patients) => (this.patients = patients));
  }

  get outputValue(): CreateDocument {
    return { ...this.form.value };
  }

}
