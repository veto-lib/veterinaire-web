import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { DoctorsService } from 'src/app/services/doctors.service';

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
    private doctorsService: DoctorsService,
    private auth: AuthService,
    private router: Router
  ) {
    this.form.get('email')?.disable();
  }

  save() {
    this.form.markAsPristine();
    this.form.get('email')?.enable();
    this.doctorsService.create(this.form.value).subscribe(() => {
      this.router.navigate(['attente']);
    });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return this.form.pristine;
  }
}
