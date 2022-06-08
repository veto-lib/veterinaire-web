import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less']
})
export class RecordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  documents = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  meetings = [
    {
      doctor: 'Dr Hugo Hall',
      date: new Date('1/1/16'),
    },
    {
      doctor: 'Dr Hugo Hall',
      date: new Date('1/17/16'),
    },
    {
      doctor: 'Dr Hugo Hall',
      date: new Date('1/28/16'),
    }
  ];


}
