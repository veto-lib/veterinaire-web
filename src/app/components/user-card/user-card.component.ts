import { Component, Input, OnInit } from '@angular/core';

import { ICustomer } from 'src/app/models/customer';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {

  @Input() customer: ICustomer;

  constructor() { }

  ngOnInit(): void {
  }

}
