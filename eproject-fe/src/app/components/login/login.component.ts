import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employee!: Employee;
  btnDisable = false;
  url = 'http://localhost:3030/v1/api/accounts/login';

  constructor(private rest: RestApiService, 
    private data: DataService,
    private router: Router) { 
    this.employee = new Employee();
  }

  ngOnInit() {
  }

  validate() {
    return true;
  }

  async login(){
    this.btnDisable = true;
    if (this.validate()) {
      this.rest.post(this.url, this.employee).then(async (data: any) => {
        localStorage.setItem('token', data.token);
        await this.data.getProfile(data.employeeId);
        this.data.success('Login successful');
        this.btnDisable = false;
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
      })
      .catch(res => {
        this.data.error(res.error['message']);
        this.btnDisable = false;
      })
    }
  }
  
}
