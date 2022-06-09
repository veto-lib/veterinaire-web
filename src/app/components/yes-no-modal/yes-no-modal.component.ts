import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.less']
})
export class YesNoModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public title: string) { }

  ngOnInit(): void {
  }

}
