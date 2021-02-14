import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from '../models/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  //urlBase = 'http://localhost:3000';
  urlBase = 'https://hackathon-2021-cebem.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getToken() {
    return localStorage.getItem('auth-token') || '';
  }

  getAll(): Observable<Donation[]> {
    const headers = { 'auth-token': this.getToken() };
    const url = this.urlBase + '/api/donation';
    return this.httpClient.get<Donation[]>(url, { headers });
  }

  getFiltered(name: string): Observable<Donation[]>{
    let params = new HttpParams();
    console.log(name)
    params = params.append('name', name);
    //params = params.append('address', address);

    const headers = { 'auth-token': this.getToken() };
    const url = this.urlBase + '/api/donation/filter';
    return this.httpClient.get<Donation[]>(url, { headers, params });
  }
  getAllOwn(): Observable<Donation[]> {
    const headers = { 'auth-token': this.getToken() };
    const url = this.urlBase + '/api/user/donations';
    return this.httpClient.get<Donation[]>(url, { headers });
  }

  getDonation(id: string): Observable<Donation> {
    const headers = { 'auth-token': this.getToken() };
    const url = this.urlBase + '/api/donation/' + id;
    return this.httpClient.get<Donation>(url, { headers });
  }

  remove(id: string): Observable<any> {
    const headers = { 'auth-token': this.getToken() };
    const url = this.urlBase + '/api/donation/' + id;
    return this.httpClient.delete(url, { headers });
  }

  add(donation: Donation): Observable<any> {
    const body = JSON.stringify(donation);
    const headers = { 'auth-token': this.getToken(), 'Content-Type': 'application/json' };
    const url = this.urlBase + '/api/donation/';
    return this.httpClient.post(url, body, { headers });
  }

  update(id: string, donation: Donation): Observable<any> {
    const body = JSON.stringify(donation);
    const headers = { 'auth-token': this.getToken(), 'Content-Type': 'application/json' };
    const url = this.urlBase + '/api/donation/' + id;
    return this.httpClient.put(url, body, { headers });
  }

  updateDonationStatus(idDonation: string, status: boolean): Observable<any> {
    const headers = { 'auth-token': this.getToken(), 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams().set('isActive', status.toString());
    const url = this.urlBase + '/api/donation/' + idDonation;
    return this.httpClient.put(url, body, { headers });
  }

  reserve(idDonation: string, demandantMessage: string): Observable<any> {
    const headers = { 'auth-token': this.getToken(), 'Content-Type': 'application/json' };
    const url = this.urlBase + `/api/donation/${idDonation}/reserve`;
    return this.httpClient.patch(url, { demandantMessage }, { headers });
  }

  deReserve(idDonation: string): Observable<any> {
    const headers = { 'auth-token': this.getToken(), 'Content-Type': 'application/json' };
    const url = this.urlBase + `/api/donation/${idDonation}/reserve`;
    return this.httpClient.delete(url, { headers });
  }

  //   /:idDonation/reserve_by/:idUser'
}
