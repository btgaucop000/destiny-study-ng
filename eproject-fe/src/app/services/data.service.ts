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
  
  async getProfile(id: string) {
    try {
      if(localStorage.getItem('token')) {
        const data:any = await this.rest.get(this.url, id);
        sessionStorage.setItem('userName', data.employee.name);
      }
    } catch (error) {
      this.error(error);
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
