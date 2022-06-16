import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IEvent } from 'src/app/models/event';

@Component({
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.less'],
})
export class EventModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public event: IEvent,
    private ref: MatDialogRef<EventModalComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  joinCall() {
    this.router.navigate([ 'consultation', this.event.id ]).then(() => {
      this.ref.close();
    });
  }
}
