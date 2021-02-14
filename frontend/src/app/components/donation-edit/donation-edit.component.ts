import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { Donation } from '../../models/donation';
import { WiredCombo, WiredInput, WiredToggle } from 'wired-elements';
import { DatePipe } from '@angular/common';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-donation-edit',
  templateUrl: './donation-edit.component.html',
  styleUrls: ['./donation-edit.component.scss']
})
export class DonationEditComponent implements OnInit {

  @ViewChild('name', { static: false }) name!: ElementRef;
  @ViewChild('description', { static: false }) description!: ElementRef;
  @ViewChild('type', { static: false }) type!: ElementRef;
  @ViewChild('expirationDate', { static: false }) expirationDate!: ElementRef;
  @ViewChild('address', { static: false }) address!: ElementRef;
  @ViewChild('isActive', { static: false }) isActive!: ElementRef;
  @ViewChild('for3Sector', { static: false }) for3Sector!: ElementRef;
  @ViewChild('forPublic', { static: false }) forPublic!: ElementRef;
  @ViewChild('picture', { static: false }) picture!: ElementRef;

  public id: string | undefined = undefined;
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private donationService: DonationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      expirationDate: [''],
      address: [''],
      for3Sector: [true],
      forPublic: [true],
      isActive: [true],
      picture: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.donationService.getDonation(this.id).subscribe(
        result => {this.form.patchValue(result);
          this.pathch(result)
        },
        error => this.snackBarService.error('Erro:' + error.error, 'Pechar')
      );
    }
  }

  pathch(result: any): void {
    console.log(result.expirationDate);
    (this.name.nativeElement as WiredInput).value = result.name;
    (this.description.nativeElement as WiredInput).value = result.description || '';
    (this.type.nativeElement as WiredCombo).selected = result.type;

    (this.expirationDate.nativeElement as WiredInput).value = new DatePipe('en-US').transform(result.expirationDate, 'yyyy-MM-dd') || '';
    (this.address.nativeElement as WiredInput).value = result.address;
   // this.isActive.nativeElement.detail.checked = result.isActive;
    (this.isActive.nativeElement as WiredToggle).checked=result.isActive;
    (this.for3Sector.nativeElement as WiredToggle).checked=result.for3Sector;
    (this.forPublic.nativeElement as WiredToggle).checked=result.forPublic;
   // (this.isActive.nativeElement as WiredInput).detail.checked = result.isActive;
   // (this.picture.nativeElement as WiredInput).value = result.picture  || '';
  }
  onSubmit(formValue: Donation): void {
    console.log(formValue)
     if (this.id) {
       this.updateExistent(this.id, formValue);
     } else {
       this.saveNew(formValue);
     }

  }


  saveNew(donation: Donation): void {
    this.donationService.add(donation).subscribe(
      result => {
        this.snackBarService.info('Doación gardada correctamente', 'Pechar')
        console.log('Gardado correctamente' + donation);
        this.router.navigate(['/user/donation']);
      },
      error => this.snackBarService.error('Erro ao gardar:' + error.error, 'Pechar')
    );
  }
  updateExistent(id: string, donation: Donation): void {
    this.donationService.update(id, donation).subscribe(
      result => {
        this.snackBarService.info('Doación modificada correctamente', 'Pechar')
        console.log('Modificada correctamente' + donation);
        this.router.navigate(['/user/donation']);
      },
      error => this.snackBarService.error('Erro ao actualizar:' + error.error, 'Pechar')
    );
  }

  update(e: any, v: any) {
    console.log(e.target.value)
    this.form.patchValue({ [v.name]: e.value });

  }
  changeName(e: any): void {
    console.log(e)
    this.form.patchValue({ name: e.value });
  }
  changeDescription(e: any): void {
    console.log(e)
    this.form.patchValue({ description: e.value });
  }
  changeType(e: any): void {
    console.log(e)
    this.form.patchValue({ type: e.selected });
  }
  changeExpirationDate(e: any): void {
    this.form.patchValue({ expirationDate: e.value });
  }
  changeAddress(e: any): void {
    this.form.patchValue({ address: e.value });
  }
  changeIsActive(a: any, e: any): void {
    this.form.patchValue({ isActive: a.detail.checked });
  }
  changeForPublic(a: any, e: any): void {
    this.form.patchValue({ forPublic: a.detail.checked });
  }
  changeFor3Sector(a: any, e: any): void {
    this.form.patchValue({ for3Sector: a.detail.checked });
  }

  cancelar(){
    this.router.navigate(['/donation-list']);
  }
}
