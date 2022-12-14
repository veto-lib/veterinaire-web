import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FileInput } from 'ngx-material-file-input';

import { IAnimal } from 'src/app/models/animal';
import { ICustomer } from 'src/app/models/customer';
import { CreateDocument } from 'src/app/models/document';

import { CustomersService } from 'src/app/services/customers.service';

@Component({
  templateUrl: './upload-document-modal.component.html',
  styleUrls: ['./upload-document-modal.component.less'],
})
export class UploadDocumentModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { customer: ICustomer, animal: IAnimal },
    private fb: FormBuilder,
    private customersService: CustomersService,
  ) {}

  customers: ICustomer[] = [];

  form = this.fb.group(
    {
      name: ['', Validators.required],
      file: ['', Validators.required]
    }
  );

  ngOnInit() {
    this.customersService
      .getClinicCustomers()
      .subscribe((customers) => (this.customers = customers));
  }

  get outputValue(): CreateDocument {
    return {
      name: this.form.value.name as string,
      file: this.form.value.file as unknown as FileInput,
      animal: this.data.animal.id.toString(),
      customer: this.data.customer.email
    };
  }

}
