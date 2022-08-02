import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PatientsService } from 'src/app/services/patients.service';
import { AuthService } from 'src/app/services/auth.service';

import { IPatient } from 'src/app/models/patient';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.less'],
})
export class CustomersComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<IPatient> = new MatTableDataSource([] as IPatient[]);

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'gender',
    'favorite',
    'medicalRecord'
  ];

  constructor(private service: PatientsService, private auth: AuthService) {}

  ngAfterViewInit(): void {
    this.service.getMyPatients().subscribe(patients => {
      this.dataSource = new MatTableDataSource(patients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  isFavoriteOfPatient(patient: IPatient): boolean {
    return !!patient.favorites.find(d => d.email === this.auth.email);
  }
}
