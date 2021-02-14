import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DonationService } from '../../services/donation.service';
import { Donation } from '../../models/donation';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {

  public donations: Donation[]= [];

  constructor(private donationService: DonationService,
    private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.loadDonations();
  }

  loadDonations(){
    this.donationService.getAll().subscribe(
      res => this.donations = res,
      error => this.snackBarService.error('Error al cargar las donaciones:' + error.error, 'Cerrar')
    );
  }


  deleteDonation(id: string): void {
    this.donationService.remove(id).subscribe(
      result => this.loadDonations(),
      error => alert('Error al borrar la donacino:' + error.error.mensaje)
    );
  }

  filtrar(search: any): void{
    console.log(search.value)
    this.donationService.getFiltered(search.value).subscribe(
      res => this.donations = res,
      error => this.snackBarService.error('Error al cargar las donaciones:' + error.error, 'Cerrar')
    );
  }
}
