import { Component } from '@angular/core';
import { Router } from '@angular/router';

const displaySidenavBlacklist = [
  '/',
  '/inscription',
  '/attente'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private router: Router) {}

  get canDisplaySidenav(): boolean {
    return !displaySidenavBlacklist.includes(this.router.url);
  }
}
