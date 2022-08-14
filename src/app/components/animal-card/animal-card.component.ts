import { Component, Input, OnInit } from '@angular/core';

import { IAnimal } from 'src/app/models/animal';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.less']
})
export class AnimalCardComponent implements OnInit {

  @Input() animal: IAnimal;

  constructor() { }

  ngOnInit(): void {
  }

}
