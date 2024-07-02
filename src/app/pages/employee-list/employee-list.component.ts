import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';

import dataDumy from './dummyData.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  Add() {
    this.router.navigate(['form', 'Add']);
  }
  EditData(e: any) {
    this.router.navigate(['form/edit', e.id]);
  }

  DetailDta(e: any, filter: any) {
    localStorage.setItem('filterEmployee', filter);
    this.router.navigate(['detail', e.id]);
  }

  onDetail(e: any) {
    if (e.tipe == 'detail') {
      this.DetailDta(e.data, e.filter);
    } else if (e.tipe == 'edit') {
      this.EditData(e.data);
    }
  }
}
