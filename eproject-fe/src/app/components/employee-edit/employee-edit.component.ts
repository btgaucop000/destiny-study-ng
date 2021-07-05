import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee!: Employee;
  btnDisable = false;
  url = 'http://localhost:3030/v1/api/accounts';
  id: string;

  constructor(private rest: RestApiService, 
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.id = route.snapshot.params['id'];
    this.employee = new Employee();
  }

  ngOnInit() {
    this.rest.get(this.url, this.id).then((data: any) => {
      this.employee = data.employee
      this.data.success('Get employee successful');
    })
    .catch(res => {
      this.data.error(res.error['message']);
    })
  }

  validate() {
    return true;
  }

  update(){
    this.btnDisable = true;

    if (this.validate()) {
      this.rest.put(this.url, this.id, this.employee).then(data => {
        this.data.success('Update employee successful');
        this.btnDisable = false;
        this.router.navigate(['/employee-list'])
      })
      .catch(error => {
        this.data.error(error['message']);
        this.btnDisable = false;
      })
    }
  }
}
