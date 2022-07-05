import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private adminService: AdminService
  ) {}

  canActivate(): Observable<boolean> {
    return this.adminService.findOne(this.auth.email).pipe(
      catchError(() => of(false)),
      map((isValid) =>
        isValid ? true : (this.router.navigateByUrl('/'), false)
      )
    );
  }
}
