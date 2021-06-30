import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employee!: Employee;
  btnDisable = false;
  url = 'http://localhost:3030/v1/api/accounts';

  constructor(private rest: RestApiService, private data: DataService) { 
    this.employee = new Employee();
  }

  ngOnInit() {
  }

  validate() {
    return true;
  }

  save(){
    this.btnDisable = true;

    if (this.validate()) {
      this.rest.post(this.url, this.employee).then(data => {
        this.data.success('Save employee successful');
        this.btnDisable = false;
      })
      .catch(error => {
        this.data.error(error['message']);
        this.btnDisable = false;
      })
    }
  }
}
