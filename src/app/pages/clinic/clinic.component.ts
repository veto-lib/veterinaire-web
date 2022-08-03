import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.less'],
})
export class ClinicComponent implements OnInit {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    price: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService
  ) {}

  ngOnInit(): void {
    this.clinicService
      .getClinicInformations()
      .subscribe((clinic) => {
        this.form.setValue(clinic);
      });
  }

  save() {
    this.form.markAsPristine();
    this.clinicService.updateClinicInformations(this.form.value).subscribe();
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return this.form.pristine;
  }
}
