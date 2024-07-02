import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent implements OnInit {
  LoginForm!: FormGroup;
  hide = true;
  buttonStatus: boolean = false;
  tipeForm: any;
  dataSelected: any;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.FormGroup();

    this.tipeForm = this.route.snapshot.paramMap.get('tipe');
    if (this.tipeForm != 'Add') {
      this.tipeForm = 'Edit';
      let tmp: any = localStorage.getItem('dataEmployee');

      let tmp2 = JSON.parse(tmp);

      let id = this.route.snapshot.paramMap.get('tipe');
      this.dataSelected = tmp2.find((x: any) => x.id == id);

      this.dataSelected.birthDate = new Date(this.dataSelected.birthDate);
      this.LoginForm.setValue({
        username: this.dataSelected.username,
        firstName: this.dataSelected.firstName,
        lastName: this.dataSelected.lastName,
        email: this.dataSelected.email,
        birthDate: this.dataSelected.birthDate,
        basicSalary: this.dataSelected.basicSalary,
        status: this.dataSelected.status,
        group: this.dataSelected.group,
        description: this.dataSelected.description,
      });
    }
  }

  FormGroup() {
    this.LoginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', Validators.required),
      basicSalary: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.LoginForm.controls['group'].setValue('one');
    this.LoginForm.controls['username'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['firstName'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['lastName'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['email'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['birthDate'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['basicSalary'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['status'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['group'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['description'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
  }

  LoginValidation() {
    if (
      this.LoginForm.value.username &&
      this.LoginForm.value.firstName &&
      this.LoginForm.value.lastName &&
      this.LoginForm.value.email &&
      this.LoginForm.value.birthDate &&
      this.LoginForm.value.basicSalary &&
      this.LoginForm.value.status &&
      this.LoginForm.value.group &&
      this.LoginForm.value.description
    ) {
      this.buttonStatus = false;
    }
  }
  get username() {
    return this.LoginForm.get('email') as FormControl;
  }
  get firstName() {
    return this.LoginForm.get('email') as FormControl;
  }
  get lastName() {
    return this.LoginForm.get('email') as FormControl;
  }
  get email() {
    return this.LoginForm.get('email') as FormControl;
  }
  get birthDate() {
    return this.LoginForm.get('email') as FormControl;
  }
  get basicSalary() {
    return this.LoginForm.get('email') as FormControl;
  }
  get status() {
    return this.LoginForm.get('email') as FormControl;
  }
  get group() {
    return this.LoginForm.get('email') as FormControl;
  }
  get description() {
    return this.LoginForm.get('email') as FormControl;
  }

  getErrorMessage() {
    if (
      this.username.hasError('required') ||
      this.firstName.hasError('required') ||
      this.lastName.hasError('required') ||
      this.birthDate.hasError('required') ||
      this.basicSalary.hasError('required') ||
      this.status.hasError('required') ||
      this.group.hasError('required') ||
      this.description.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  Save() {
    this.LoginForm.value.birthDate = this.convertDate(
      this.LoginForm.value.birthDate
    );

    if (this.tipeForm == 'Add') {
      this.LoginForm.value.id = 1;
      this.AddEmployee();
    } else if (this.tipeForm == 'Edit') {
      this.LoginForm.value.id = this.dataSelected.id;
      this.EditEmployee();
    }
    this.router.navigate(['list']);
  }
  convertDate(value: any) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
  }
  Cancel() {
    this.router.navigate(['list']);
  }

  AddEmployee() {
    let tmp: any = localStorage.getItem('dataEmployee');
    let tmp2: any = JSON.parse(tmp);
    tmp2.map((e: any) => e.id++);
    tmp2.unshift(this.LoginForm.value);
    localStorage.setItem('dataEmployee', JSON.stringify(tmp2));
  }
  EditEmployee() {
    let tmp: any = localStorage.getItem('dataEmployee');
    let tmp2: any = JSON.parse(tmp);
    let tmp3: any = JSON.parse(tmp);
    let index = tmp3.findIndex((x: any) => x.id == this.dataSelected.id);
    tmp2.splice(index, 1, this.LoginForm.value);
    localStorage.setItem('dataEmployee', JSON.stringify(tmp2));
  }
}
