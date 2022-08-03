import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { VeterinariesService } from '../services/veterinaries.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatedUserGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private veterinariesService: VeterinariesService
  ) {}

  canActivate(): Observable<boolean> {
    return this.veterinariesService.findOne(this.auth.email).pipe(
      catchError(() => of({ enabled: false })),
      map((veterinary) => veterinary.enabled && this.auth.isLoggedIn),
      map((isValid) =>
        isValid ? true : (this.router.navigateByUrl('/'), false)
      )
    );
  }
}
