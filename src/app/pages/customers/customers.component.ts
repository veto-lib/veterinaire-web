import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CustomersService } from 'src/app/services/customers.service';
import { AuthService } from 'src/app/services/auth.service';

import { ICustomer } from 'src/app/models/customer';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.less'],
})
export class CustomersComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ICustomer> = new MatTableDataSource([] as ICustomer[]);

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'gender',
    'medicalRecord'
  ];

  constructor(private service: CustomersService, private auth: AuthService) {}

  ngAfterViewInit(): void {
    this.service.getClinicCustomers('').subscribe(customers => {
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
