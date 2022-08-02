import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {}

  login() {
    this.doctorsService.findOne(this.auth.email).subscribe(
      (doctor) => {
        doctor.enabled
          ? this.router.navigate(['clients'])
          : this.router.navigate(['attente'])
      },
      () => {
        this.router.navigate(['inscription']);
      }
    );
  }
}
