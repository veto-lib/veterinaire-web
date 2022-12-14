import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';

import { ICustomer } from 'src/app/models/customer';
import { IAnimal } from 'src/app/models/animal';
import { CreateEvent } from 'src/app/models/event';
import { EventReason } from 'src/app/models/common';

import { CustomersService } from 'src/app/services/customers.service';
import { AuthService } from 'src/app/services/auth.service';
import { AnimalsService } from 'src/app/services/animals.service';

@Component({
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.less'],
})
export class CreateEventModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public date: Date,
    private fb: FormBuilder,
    private customersService: CustomersService,
    private animalsService: AnimalsService,
    private auth: AuthService
  ) {}

  customers: ICustomer[] = [];
  animals: IAnimal[] = [];

  eventReasons: EventReason[] = [
    'Vaccination',
    'Consultation',
    'Identification',
    'Visite de contrôle',
  ];

  form = this.fb.group(
    {
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      customer: ['', Validators.required],
      animal: ['', Validators.required],
      motive: ['', Validators.required],
      notes: ['', Validators.required],
    },
    {
      validators: [this.endDateAfterStartDate],
    }
  );

  ngOnInit() {
    this.customersService
      .getClinicCustomers()
      .subscribe((customers) => (this.customers = customers));
    this.form.controls['start'].setValue(this.date.toISOString());
    this.form.controls['end'].setValue(
      moment(this.date).add(1, 'h').toDate().toISOString()
    );
    this.form.controls['customer'].valueChanges.subscribe((customerEmail) => {
      this.animals = [];
      this.animalsService
        .getCustomerAnimals(customerEmail as string)
        .subscribe((animals) => {
          this.animals = animals;
        });
    });
  }

  endDateAfterStartDate(group: AbstractControl): ValidationErrors | null {
    const start = group.get('start')?.value;
    const end = group.get('end')?.value;
    return !!start && !!end && moment(start).isBefore(moment(end))
      ? null
      : { endBeforeStart: 'error' };
  }

  get outputValue(): CreateEvent {
    return {
      title: this.form.value.title as string,
      start: new Date(this.form.value.start as string),
      end: new Date(this.form.value.end as string),
      customer: this.form.value.customer as string,
      notes: this.form.value.notes as string,
      veterinary: this.auth.email,
      animal: (this.form.value.animal as string).toString(),
      reason: this.form.value.motive as EventReason,
    };
  }
}
