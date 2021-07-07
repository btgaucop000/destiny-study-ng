import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  getAll(endpoint: string) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders) {
      return this.http.get(endpoint, {headers: headers}).toPromise();
    }
    return this.http.get(endpoint).toPromise();
  }

  get(endpoint: string, id: string) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders) {
      return this.http.get(endpoint + '/' + id, {headers: headers}).toPromise();
    }
    return this.http.get(endpoint + '/' + id).toPromise();
  }

  post(endpoint: string, body: any) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders) {
      return this.http.post(endpoint, body, {headers: headers}).toPromise();
    }
    return this.http.post(endpoint, body).toPromise();
  }

  put(endpoint: string, id: string, body: any) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders) {
      return this.http.put(endpoint + '/' + id, body, {headers: headers}).toPromise();
    }
    return this.http.put(endpoint + '/' + id, body).toPromise();
  }

  delete(endpoint: string, id: string) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders) {
      return this.http.delete(endpoint + '/' + id, {headers: headers}).toPromise();
    }
    return this.http.delete(endpoint + '/' + id).toPromise();
  }

  getProfile(endpoint: string, id: any) {
    let headers = this.getHeaders();
    if(headers instanceof HttpHeaders) {
      return this.http.get(endpoint + '/' + id, {headers: headers}).toPromise();
    }
    return this.http.get(endpoint).toPromise();
  }
}
