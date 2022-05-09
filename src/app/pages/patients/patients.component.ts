import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { PatientsService } from 'src/app/services/patients.service';

import { Patient } from 'src/app/models/patient';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.less'],
})
export class PatientsComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Patient> = new MatTableDataSource([] as Patient[]);

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'gender',
    'favorite',
  ];

  constructor(private service: PatientsService) {}

  ngAfterViewInit(): void {
    this.service.getMyPatients().subscribe(patients => {
      this.dataSource = new MatTableDataSource(patients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
