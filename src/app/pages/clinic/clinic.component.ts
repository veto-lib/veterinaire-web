import { AfterContentInit, Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { IClinic } from 'src/app/models/clinic';
import { AnimalType, PaymentMeans } from 'src/app/models/common';

import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.less'],
})
export class ClinicComponent implements AfterContentInit {
  form = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    openingHours: ['', Validators.required]
  });

  animals: AnimalType[] = [];
  animalTypes: AnimalType[] = [
    'Chat',
    'Cheval',
    'Chien',
    'Lézard',
    'Oiseau',
    'Poisson',
    'Rongeur',
  ];

  paymentMeans: PaymentMeans[] = [];
  paymentMeansTypes: PaymentMeans[] = [
    'CB',
    'Chèques',
    'Liquide'
  ];

  clinic: IClinic;

  constructor(private fb: FormBuilder, private clinicService: ClinicService) {}

  ngAfterContentInit(): void {
    this.clinicService.getClinicInformations().subscribe((clinic) => {
      clinic.compatibleAnimals = JSON.parse(clinic.compatibleAnimals as unknown as string);
      clinic.paymentMeans = JSON.parse(clinic.paymentMeans as unknown as string);
      this.animals = clinic.compatibleAnimals;
      this.paymentMeans = clinic.paymentMeans;
      this.clinic = clinic;
      this.form.setValue(this.fromObject(clinic));
    });
  }

  animalSelectionChanged(animals: AnimalType[]) {
    this.form.markAsDirty();
    this.animals = animals;
  }

  paymentMeansSelectionChanged(paymentMeans: PaymentMeans[]) {
    this.form.markAsDirty();
    this.paymentMeans = paymentMeans;
  }

  canSave(): boolean {
    return this.form.valid && this.animals.length > 0 && this.paymentMeans.length > 0 && !this.form.pristine;
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

  fromObject(object: IClinic) {
    return {
      name: object.name,
      address: object.address,
      phone: object.phone,
      openingHours: object.openingHours,
    };
  }

  toObject(): IClinic {
    return {
      name: this.form.value.name as string,
      address: this.form.value.name as string,
      phone: this.form.value.name as string,
      openingHours: this.form.value.name as string,
      compatibleAnimals: this.animals,
      paymentMeans: this.paymentMeans
    };
  }
}
