import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import dataDumy from '../dummyData.json';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, AfterViewInit {
  @Output() onDetail: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataemployee: any;
  dataSource!: MatTableDataSource<any>;
  filterValue: string = '';
  displayedColumns: string[] = [
    'id',
    'username',
    'firstName',
    'lastName',
    'email',
    'action',
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    let dataFilterEmployee = localStorage.getItem('filterEmployee');
    this.filterValue = dataFilterEmployee ? dataFilterEmployee : '';

    this.GetData();
  }
  GetData() {
    this.dataemployee = localStorage.getItem('dataEmployee');
    if (this.dataemployee == null) {
      this.dataSource = new MatTableDataSource(dataDumy);
      localStorage.setItem('dataEmployee', JSON.stringify(dataDumy));
    } else {
      this.dataSource = new MatTableDataSource(JSON.parse(this.dataemployee));
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  DetailData(tipe: any, e: any) {
    let tmp = {
      tipe: tipe,
      data: e,
      filter: this.filterValue,
    };
    this.onDetail.emit(tmp);
  }
  DeleteData(e: any) {
    Swal.fire({
      title: 'Do you want to Delete Data?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        let tmp: any = localStorage.getItem('dataEmployee');
        let tmp2: any = JSON.parse(tmp);
        let tmp3: any = JSON.parse(tmp);
        let index = tmp3.findIndex((x: any) => x.id == e.id);
        tmp2.splice(index, 1);
        localStorage.setItem('dataEmployee', JSON.stringify(tmp2));
        this.GetData();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        Swal.fire('Saved!', '', 'success');
      }
    });
  }
}
