import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  dataemployee: any;
  dataSelected: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let tmp: any = localStorage.getItem('dataEmployee');
    this.dataemployee = JSON.parse(tmp);
    let id = this.route.snapshot.paramMap.get('id');
    this.dataSelected = this.dataemployee.find((x: any) => (x.id = id));
    // let tmpSelected = this.dataemployee.find((x: any) => (x.id = id));
    let number_string = this.dataSelected.basicSalary.toString();
    let sisa = number_string.length % 3;
    let rupiah = number_string.substr(0, sisa);
    let ribuan = number_string.substr(sisa).match(/\d{3}/g);
    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    this.dataSelected.basicSalary = rupiah;
  }

  BackPage() {
    this.router.navigate(['list']);
  }
}
