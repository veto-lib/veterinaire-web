import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent {

  pages = [
    { name: 'Mes patients', value: 'patients', redirect: '/patients' },
    { name: 'Agenda', value: 'agenda', redirect: '/' },
    { name: 'Mes Informations', value: 'informations', redirect: '/' },
  ];

}
