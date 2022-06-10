import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IEvent } from 'src/app/models/event';

@Component({
  templateUrl: './visualize-notes-modal.component.html',
  styleUrls: ['./visualize-notes-modal.component.less']
})
export class VisualizeNotesModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public event: IEvent) { }

  ngOnInit(): void {
  }

}
