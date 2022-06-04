import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.less']
})
export class InformationsComponent implements OnInit {

  form = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      price: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
