import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { RestApiService } from './rest-api.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  message = '';
  messageType = 'danger';
  employee!: Employee | null;
  url = 'http://localhost:3030/v1/api/accounts/get/profile';

  constructor(private router: Router, private rest: RestApiService) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.message = '';
      }
    })
  }
  
  async getProfile() {
    try {
      if(localStorage.getItem('token') && localStorage.getItem('id')) {
        const data:any = await this.rest.getProfile(this.url, localStorage.getItem('id'));
        this.employee = data.employee;
      }
    } catch (res) {
      throw new Error(res.error.message);
    }
  }

  error(message: string) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message: string) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message: string) {
    this.messageType = 'warning';
    this.message = message;
  }

}
