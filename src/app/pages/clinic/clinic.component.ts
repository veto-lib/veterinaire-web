import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IClinic } from 'src/app/models/clinic';

import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.less'],
})
export class ClinicComponent implements OnInit {
  form = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    openingHours: ['', Validators.required],
    compatibleAnimals: ['', Validators.required],
    paymentMeans: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private clinicService: ClinicService) {}

  ngOnInit(): void {
    this.clinicService.getClinicInformations().subscribe((clinic) => {
      this.form.setValue(this.fromObject(clinic));
    });
  }

  save() {
    this.form.markAsPristine();
    this.clinicService
      .updateClinicInformations(this.toObject())
      .subscribe();
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return this.form.pristine;
  }

  fromObject(object: IClinic): { [k in keyof IClinic]: string | null } {
    return {} as any;
  }

  toObject(): IClinic {
    return this.form.value as unknown as IClinic;
  }
}
