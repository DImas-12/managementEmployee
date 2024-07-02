import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  hide = true;
  buttonStatus: boolean = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.FormGroup();
  }

  FormGroup() {
    this.LoginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
    this.LoginForm.controls['username'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
    this.LoginForm.controls['password'].valueChanges.subscribe((value) => {
      this.LoginValidation();
    });
  }

  LoginValidation() {
    if (this.LoginForm.value.username && this.LoginForm.value.password) {
      this.buttonStatus = false;
    }
  }
  get username() {
    return this.LoginForm.get('username') as FormControl;
  }
  get password() {
    return this.LoginForm.get('password') as FormControl;
  }

  getErrorMessage() {
    if (
      this.username.hasError('required') ||
      this.password.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return this.username.hasError('username') ? 'Not a valid email' : '';
  }

  Login() {
    let tmpLogin = {
      username: 'admin',
      password: 'admin',
    };

    if (
      this.LoginForm.value.username == tmpLogin.username &&
      this.LoginForm.value.password == tmpLogin.password
    ) {
      this.router.navigate(['list']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username dan Password salah',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }
}
