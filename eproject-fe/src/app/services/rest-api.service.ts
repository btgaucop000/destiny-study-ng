import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  getAll(endpoint: string) {
    return this.http.get(endpoint).toPromise();
  }

  get(endpoint: string, id: string) {
    return this.http.get(endpoint + '/' + id).toPromise();
  }

  post(endpoint: string, body: any) {
    return this.http.post(endpoint, body).toPromise();
  }

  put(endpoint: string, id: string, body: any) {
    return this.http.put(endpoint + '/' + id, body).toPromise();
  }

  delete(endpoint: string, id: string) {
    return this.http.delete(endpoint + '/' + id).toPromise();
  }
}
