import { User } from './../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WiredInput } from 'wired-elements';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @ViewChild('name', { static: false }) name!: ElementRef;
  @ViewChild('email', { static: false }) email!: ElementRef;
  @ViewChild('password', { static: false }) password!: ElementRef;
  @ViewChild('address', { static: false }) address!: ElementRef;

  public is3sector = false;
  public theAddress = '';
  public id: string | undefined = undefined;
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.userService.getUser(this.id).subscribe(
        result => {
          this.form.patchValue(result);
          this.pathch(result)
        },
        error => this.snackBarService.info('Erro ao ler o usuario', 'Pechar')
      );
    }
  }

  pathch(result: any): void {
    (this.name.nativeElement as WiredInput).value = result.name;
    (this.email.nativeElement as WiredInput).value = result.email;
    (this.password.nativeElement as WiredInput).value = result.password;
    (this.address.nativeElement as WiredInput).value = result.address;
  }

  onSubmit(formValue: User): void {
    if (this.id) {
      this.actualizarExistente(this.id, formValue);
    } else {
      this.guardarNuevo(formValue);
    }

  }

  guardarNuevo(dato: User): void {
    this.userService.add(dato).subscribe(
      result => {
        console.log('gardado correctamente' + dato.email);
        this.router.navigate(['/donation-list']);
      },
      error => this.snackBarService.info('Erro ao tentar gardar o usuario', 'Pechar')
    );
  }

  actualizarExistente(id: string, dato: User): void {
    this.userService.update(id, dato).subscribe(
      result => {
        console.log('guardado correctamente' + dato);
        this.router.navigate(['/donation-list']);
      },
      error => this.snackBarService.info('Erro ao tentar actualizar o usuario', 'Pechar')
    );
  }

  query3Sector(email: string): any {
    return this.userService.isTercerSector(email).subscribe(
      res => {
        this.is3sector = true;
        this.theAddress = res.address;
        this.form.patchValue({ address: res.address });
      },
      error => this.is3sector = false
    );
  }

  changeName(e: any): void {
    this.form.patchValue({ name: e.value });
  }

  changeEmail(e: any): void {
    this.form.patchValue({ email: e.value });
    this.query3Sector(e.value);
  }

  changePassword(e: any): void {
    this.form.patchValue({ password: e.value });
  }
  changePassword2(e: any): void {
    // TODO: Compare the two password
    this.form.patchValue({ password: e.value });
  }

  changeAddress(e: any): void {
    this.form.patchValue({ address: e.value });
  }

  getLoggedIn(): string {
    let user = localStorage.getItem('current-user');
    if (user) return JSON.parse(user).email;
    return ''
  }

  getMode(): string {
    if (this.getLoggedIn()) {
      return "Crear usuario"
    }
    return "Rexistrarse"
  }
}
