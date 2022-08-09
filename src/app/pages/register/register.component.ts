import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    address: ['', Validators.required],
    price: ['', Validators.required],
    gender: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private veterinariesService: VeterinariesService,
    private auth: AuthService,
    private router: Router
  ) {
    this.form.get('email')?.disable();
  }

  save() {
    this.form.markAsPristine();
    this.form.get('email')?.enable();
    this.veterinariesService.create(this.outputValue).subscribe(() => {
      this.router.navigate(['attente']);
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return this.form.pristine;
  }

  get outputValue(): CreateVeterinary {
    return {
      email: this.auth.email,
      firstName: this.form.value.firstName as string,
      lastName: this.form.value.lastName as string,
      birthDate: new Date(this.form.value.birthDate as string),
      address: this.form.value.address as string,
      price: this.form.value.price as string,
      gender: this.form.value.gender as 'M' | 'F',
    };
  }
}
