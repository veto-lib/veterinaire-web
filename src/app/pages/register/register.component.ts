import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AnimalType } from 'src/app/models/common';
import { CreateVeterinary } from 'src/app/models/veterinary';

import { AuthService } from 'src/app/services/auth.service';
import { VeterinariesService } from 'src/app/services/veterinaries.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent {
  form = this.fb.group({
    email: [this.auth.email, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    gender: ['', Validators.required],
  });

  hasSaved = false;

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

  constructor(
    private fb: FormBuilder,
    private veterinariesService: VeterinariesService,
    private auth: AuthService,
    private router: Router
  ) {
    this.form.get('email')?.disable();
  }

  animalSelectionChanged(animals: AnimalType[]) {
    this.animals = animals;
  }

  canSave(): boolean {
    return this.form.valid && this.animals.length > 0;
  }

  save() {
    this.form.markAsPristine();
    this.form.get('email')?.enable();
    this.veterinariesService.create(this.outputValue).subscribe(() => {
      this.hasSaved = true;
      this.router.navigate(['attente']);
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return (this.form.pristine && this.animals.length === 0) || this.hasSaved;
  }

  get outputValue(): CreateVeterinary {
    return {
      email: this.auth.email,
      firstName: this.form.value.firstName as string,
      lastName: this.form.value.lastName as string,
      birthDate: new Date(this.form.value.birthDate as string),
      gender: this.form.value.gender as 'M' | 'F',
      compatibleAnimals: this.animals,
    };
  }
}
