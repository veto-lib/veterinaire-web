import { AfterViewInit, Component } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

import { CustomersService } from 'src/app/services/customers.service';
import { AuthService } from 'src/app/services/auth.service';

import { ICustomer } from 'src/app/models/customer';
import { IAnimal } from 'src/app/models/animal';

interface FlatNode {
  expandable: boolean;
  value: ICustomer | IAnimal;
  level: number;
}

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.less'],
})
export class CustomersComponent implements AfterViewInit {
  private _transformer = (
    node: ICustomer | IAnimal,
    level: number
  ): FlatNode => {
    return {
      expandable:
        node.kind === 'customer' && !!node.animals && node.animals.length > 0,
      value: node,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => (node.kind === 'customer' ? node.animals : [])
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private service: CustomersService, private auth: AuthService) {
    this.dataSource.data = [];
  }

  ngAfterViewInit(): void {
    this.service.getClinicCustomers().subscribe((customers) => {
      this.dataSource.data = customers;
    });
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
