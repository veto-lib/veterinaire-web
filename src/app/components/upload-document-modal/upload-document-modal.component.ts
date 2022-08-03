import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ICustomer } from 'src/app/models/customer';
import { CreateDocument } from 'src/app/models/document';

import { CustomersService } from 'src/app/services/customers.service';

@Component({
  templateUrl: './upload-document-modal.component.html',
  styleUrls: ['./upload-document-modal.component.less'],
})
export class UploadDocumentModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public date: Date,
    private fb: FormBuilder,
    private customersService: CustomersService,
  ) {}

  customers: ICustomer[] = [];

  form = this.fb.group(
    {
      name: ['', Validators.required],
      file: ['', Validators.required],
      customer: ['', Validators.required],
    }
  );

  ngOnInit() {
    this.customersService
      .getClinicCustomers()
      .subscribe((customers) => (this.customers = customers));
  }

  get outputValue(): CreateDocument {
    return { ...this.form.value };
  }

}
