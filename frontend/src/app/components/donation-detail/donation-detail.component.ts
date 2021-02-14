import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DonationService } from '../../services/donation.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.component.html',
  styleUrls: ['./donation-detail.component.scss']
})
export class DonationDetailComponent implements OnInit {

  public donation$: Observable<any>;

  constructor(private donationService: DonationService,
            private userService: UserService,
              private activatedRoute: ActivatedRoute
    ) {
    this.donation$ = donationService.getAll();
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.donation$ = this.donationService.getDonation(id);
  }

  getName(idUser: string){
    return this.userService.getUser(idUser);
  }
}
