import { Component, Input, OnInit } from '@angular/core';

import { ICustomer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.less']
})
export class CustomerCardComponent implements OnInit {

  @Input() customer: ICustomer;

  constructor() { }

  ngOnInit(): void {
  }

}
