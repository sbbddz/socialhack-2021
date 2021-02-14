import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  info(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  error(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }

  warn(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}
