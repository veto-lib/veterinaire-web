import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent {

  pages = [
    { name: 'Mes patients', value: 'patients' },
    { name: 'Agenda', value: 'agenda' },
    { name: 'Mes Informations', value: 'informations' },
  ];

}
