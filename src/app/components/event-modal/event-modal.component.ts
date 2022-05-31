import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Event } from 'src/app/models/event';

@Component({
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.less']
})
export class EventModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public event: Event) {}

  ngOnInit(): void {}

}
