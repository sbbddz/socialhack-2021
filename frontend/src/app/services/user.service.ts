import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //urlBase = 'http://localhost:3000';
  urlBase = 'https://hackathon-2021-cebem.herokuapp.com';
  constructor(private httpClient: HttpClient) { }

  getToken(){
    return localStorage.getItem('auth-token') || '';
  }

  getAll(): Observable<User[]> {
    const headers = { 'auth-token': this.getToken() };
    const url = this.urlBase + '/api/user';
    return this.httpClient.get<User[]>(url, {headers});
  }

  getUser(id: string): Observable<User> {
    const headers = { 'auth-token': this.getToken() };
    const url = this.urlBase + '/api/user/' + id;
    return this.httpClient.get<User>(url, {headers});
  }

  login(email: string, password: string): Observable<any> {
    const body = JSON.stringify({ email, password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = this.urlBase + '/api/user/login';
    return this.httpClient.post(url, body, { headers });
  }

  remove(id: string): Observable<any> {
    const headers = { 'auth-token': this.getToken() };
    const url = this.urlBase + '/api/user/' + id;
    return this.httpClient.delete(url, {headers});
  }

  add(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headers = { 'auth-token': this.getToken(), 'Content-Type': 'application/json' };
    const url = this.urlBase + '/api/user/';
    return this.httpClient.post(url, body, { headers });
  }

  update(id: string, user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headers = { 'auth-token': this.getToken(), 'Content-Type': 'application/json' };
    const url = this.urlBase + '/api/user/' + id;
    return this.httpClient.put(url, body, { headers });
  }

  isTercerSector(email: string): Observable<any> {
    const url = this.urlBase + '/api/user/isTercerSector/' + email;
    return this.httpClient.get(url);
  }

}
