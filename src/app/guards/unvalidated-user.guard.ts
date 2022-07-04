import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { DoctorsService } from '../services/doctors.service';

@Injectable({
  providedIn: 'root',
})
export class UnvalidatedUserGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private doctorsService: DoctorsService
  ) {}

  canActivate(): Observable<boolean> {
    return this.doctorsService.findOne(this.auth.email).pipe(
      catchError(() => of({ enabled: true })),
      map((doctor) => !doctor.enabled && this.auth.isLoggedIn),
      map((isValid) =>
        isValid ? true : (this.router.navigateByUrl('/'), false)
      )
    );
  }
}
