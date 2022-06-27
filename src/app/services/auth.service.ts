import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  _isLoggedIn = false;

  async start() {}

  login(): void {
    this._isLoggedIn = true;
  }

  logout(): void {
    this._isLoggedIn = false;
  }

  get token(): string | null {
    return 'izneiueznvnievniznvizevi';
  }

  get name(): string {
    return 'Quentin CARITEY';
  }

  get email(): string {
    return 'hugo.hall';
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

}
