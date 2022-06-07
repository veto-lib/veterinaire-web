import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IInformation } from 'src/app/models/information';
import { InformationsService } from 'src/app/services/informations.service';

@Component({
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.less'],
})
export class InformationsComponent implements OnInit {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    price: ['', Validators.required],
  });

  information: IInformation;

  constructor(
    private fb: FormBuilder,
    private informationService: InformationsService
  ) {}

  ngOnInit(): void {
    this.informationService
      .getMyInformation()
      .subscribe((information) => (this.information = information));
  }

  save() {
    this.informationService.updateInformation(this.form.value).subscribe();
  }
}
