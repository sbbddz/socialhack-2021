import { AssertNotNull } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donation } from '../../models/donation';
import { DonationService } from '../../services/donation.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-donation-reserve',
  templateUrl: './donation-reserve.component.html',
  styleUrls: ['./donation-reserve.component.scss']
})
export class DonationReserveComponent implements OnInit {
  @Input() donation!: Donation;

  constructor(
    private donationService: DonationService,
    private router: Router,
    private snackBarService: SnackBarService) { }
  demandantMessage = '';
  ngOnInit(): void {

  }
  getName(): string {
    const local = localStorage.getItem('current-user');
    if (local) { return JSON.parse(local).name; }
    return '';
  }
  getEmail(): string {
    const local = localStorage.getItem('current-user');
    if (local) { return JSON.parse(local).email; }
    return '';

  }
  getIdUserLogued(): string {
    const local = localStorage.getItem('current-user');
    if (local) { return JSON.parse(local)._id; }
    return '';
  }

  reloadDonation(): void{
    this.donationService.getDonation(this.donation._id || '').subscribe(
      respose => this.donation = respose,
      error => console.error(error.error)
    );
  }

  reserve(): void {
    if (this.donation._id) {
      this.donationService.reserve(this.donation._id, this.demandantMessage).subscribe(
        request => {
          this.reloadDonation();
          this.snackBarService.info('Donación reservada correctamente', 'Cerrar');

        },
        error => this.snackBarService.error('Error al intentar reservar:' + error.errar, 'Cerrar')
      );
    }
  }

  deReservar(): void {
    if (this.donation._id) {
      this.donationService.deReserve(this.donation._id).subscribe(
        request => {
          this.reloadDonation();
          this.snackBarService.info('Reserva anulada correctamente', 'Cerrar');
        },
        error => this.snackBarService.error('Error al anular reserva:' + error.errar, 'Cerrar')
      );
    }
  }
  alredyReserve(): boolean {
    return this.donation.demandant !== null;
  }
  isReserveForMe(): boolean {
    return this.donation.demandant === this.getIdUserLogued();
  }

}
