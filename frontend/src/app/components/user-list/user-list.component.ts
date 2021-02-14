import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: User[] = [];
  //public users$: Observable<any>;

  constructor(private userService: UserService, private router: Router,
    private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.readUsers();
  }

  readUsers(){
    this.userService.getAll().subscribe(
      result => this.users = result,
      error => this.snackBarService.info('Error ao cargar os usuarios', 'Pechar')
    );
  }

  borrarDato(id: string): void {
     this.userService.remove(id).subscribe(
       result => this.readUsers(),
       error => this.snackBarService.info('Error al intentar borrar el usuario', 'Cerrar')
     )
  }
}
