import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { WiredInput } from 'wired-elements';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('email', { static: false }) email!: ElementRef;
  @ViewChild('password', { static: false }) password!: ElementRef;

  public form!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }
  changeEmail(e: any): void {
    this.form.patchValue({ email: e.value });
  }
  changePassword(e: any): void {
    this.form.patchValue({ password: e.value });
  }

  onSubmit(formValue: any): void {
    console.log(formValue)
    this.userService.login(formValue.email, formValue.password).subscribe(
      result => {
        localStorage.setItem('auth-token', result.authToken);
        localStorage.setItem('current-user', JSON.stringify(result.user));
        this.snackBarService.info('Login realizado correctamente', 'Cerrar');
        this.router.navigate(['/donation-list']);
      },
      error => {
        this.snackBarService.error('Error al intentar loguearte:' + error.errar, 'Cerrar')
        console.log(error);
      }
    );
  }
}
