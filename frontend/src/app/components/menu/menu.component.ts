import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  getLoguedEmail(): string{
    const currentUser = localStorage.getItem('current-user');
    if (currentUser) {
      return JSON.parse(currentUser).email;
    } else {
      return 'no logueado';
    }
  }
  getLoguedId(): string{
    const currentUser = localStorage.getItem('current-user');
    if (currentUser) {
      return JSON.parse(currentUser).id;
    } else {
      return 'no logueado';
    }
  }

  getLoguedRol(): string{
    const currentUser = localStorage.getItem('current-user');
    if (currentUser) {
      return JSON.parse(currentUser).rol;
    } else {
      return '';
    }
  }

  isAdminRol(): boolean{
    return this.getLoguedRol() === 'admin';
  }
  is3SectorRol(): boolean{
    return this.getLoguedRol() === '3sector';
  }
  isPublicRol(): boolean{
    return this.getLoguedRol() === 'public';
  }
  isNotLogued(): boolean{
    return this.getLoguedRol() === '';
  }
  logout(): void{
    localStorage.removeItem('auth-token');
    localStorage.removeItem('current-user');
    this.snackBarService.info('Logout realizado correctamente', 'Cerrar');
    this.router.navigate(['/login']);
  }

}
