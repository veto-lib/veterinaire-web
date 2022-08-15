import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-multi-chip-select',
  templateUrl: './multi-chip-select.component.html',
  styleUrls: ['./multi-chip-select.component.less'],
})
export class MultiChipSelectComponent implements OnInit {
  dataset: Set<unknown> = new Set();
  formCtrl = new FormControl();

  @Input() label: string = '';
  @Input() possibleValues: unknown[] = [];
  @Input() set values(values: unknown[]) {
    values.forEach(v => this.dataset.add(v));
  }
  @Output() selectionChanged = new EventEmitter<unknown[]>();

  constructor() {}

  ngOnInit(): void {}

  add(event: MatSelectChange) {
    this.formCtrl.setValue(null);
    this.dataset.add(event.value);
    this.selectionChanged.next([...this.dataset.values()]);
  }

  remove(value: unknown) {
    this.dataset.delete(value);
    this.selectionChanged.next([...this.dataset.values()]);
  }
}
