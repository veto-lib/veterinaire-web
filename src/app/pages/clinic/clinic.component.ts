import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { InformationsService } from 'src/app/services/informations.service';

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
    private informationService: InformationsService
  ) {}

  ngOnInit(): void {
    this.informationService
      .getMyInformation()
      .subscribe((information) => {
        this.form.setValue(information);
      });
  }

  save() {
    this.form.markAsPristine();
    this.informationService.updateInformation(this.form.value).subscribe();
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return this.form.pristine;
  }
}
