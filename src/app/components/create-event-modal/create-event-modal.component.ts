import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.less'],
})
export class CreateEventModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public date: Date,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    title: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
    patient: ['', Validators.required],
    notes: ['', Validators.required],
  });
}
