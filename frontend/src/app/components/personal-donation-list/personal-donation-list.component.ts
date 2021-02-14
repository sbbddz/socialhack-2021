import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DonationService } from '../../services/donation.service';
import { Donation } from '../../models/donation';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-personal-donation-list',
  templateUrl: './personal-donation-list.component.html',
  styleUrls: ['./personal-donation-list.component.scss']
})
export class PersonalDonationListComponent implements OnInit {
  public donations: Donation[]= [];

  constructor(private donationService: DonationService,
    private snackBarService: SnackBarService) {
    }

  ngOnInit(): void {
    this.loadDonations();

  }

  loadDonations(){
    this.donationService.getAllOwn().subscribe(
      res => this.donations = res,
      error => this.snackBarService.error('Erro ao cargar as doacións:' + error.error, 'Pechar')
    );
  }

  sendUpdateStatus(status: boolean, id: string): void {
    if (id) {
      this.donationService.updateDonationStatus(id, status).subscribe(
        res => this.snackBarService.info('Estado da doación actualizado correctamente', 'Pechar'),
        error => this.snackBarService.error('Erro ao tentar cambiar o estado' + error.errar, 'Pechar')
      );
    }
  }

  getReserve(id: string): string {
    if (id) return "Reservado!";
    return "Non reservado!";
  }

  borrarDato(id: string | undefined): void {
    if (!id) { return; }
    this.donationService.remove(id).subscribe(
      result => this.loadDonations(),
      error => this.snackBarService.error('Erro ao tentar borrar:' + error.error, 'Fechar')
    )
  }
}
