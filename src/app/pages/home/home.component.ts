import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { VeterinariesService } from 'src/app/services/veterinaries.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private veterinariesService: VeterinariesService
  ) {}

  ngOnInit(): void {}

  login() {
    this.veterinariesService.findOne(this.auth.email).subscribe(
      (veterinary) => {
        veterinary.enabled
          ? this.router.navigate(['clients'])
          : this.router.navigate(['attente'])
      },
      () => {
        this.router.navigate(['inscription']);
      }
    );
  }
}
