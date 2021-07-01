import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees! : Employee[];
  url = 'http://localhost:3030/v1/api/accounts';

  constructor(private rest: RestApiService, private data: DataService) { 

   }

  ngOnInit() {
    this.rest.getAll(this.url).then((data: any) => {
      this.employees = data.employees
      this.data.success('Get employee successful');
    })
    .catch(error => {
      this.data.error(error['message']);
    })
  }

}
