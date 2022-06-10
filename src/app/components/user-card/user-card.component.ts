import { Component, Input, OnInit } from '@angular/core';

import { IPatient } from 'src/app/models/patient';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {

  @Input() patient: IPatient;

  constructor() { }

  ngOnInit(): void {
  }

}
