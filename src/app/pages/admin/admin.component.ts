import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { IDoctor } from 'src/app/models/doctor';

import { AdminService } from 'src/app/services/admin.service';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<IDoctor> = new MatTableDataSource([] as IDoctor[]);

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'gender',
    'email',
    'approve'
  ];

  constructor(private service: AdminService) {}

  ngAfterViewInit(): void {
    this.resetView();
  }

  resetView() {
    this.service.findAllUnvalidated().subscribe(doctors => {
      this.dataSource = new MatTableDataSource(doctors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  approve(doctor: IDoctor) {
    this.service.validateDoctor(doctor.email).subscribe(() => {
      this.resetView();
    });
  }

}
