import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects! : Project[];
  url = 'http://localhost:3030/v1/api/projects';

  constructor(private rest: RestApiService, private data: DataService) { 

   }

  ngOnInit() {
    this.rest.getAll(this.url).then((res: any) => {
      this.projects = res.data
      // this.data.success('Get list project successful');
    })
    .catch(res => {
      this.data.error(res.error['message']);
    })

    setTimeout(() => {
      this.data.message = '';
    }, 500);
  }

  delete(id: string) {
    this.rest.delete(this.url, id).then((data: any) => {
      this.data.success(data['message']);
      setTimeout(() => {
        this.ngOnInit();
      }, 500);
    })
    .catch(res => {
      this.data.error(res.error['message']);
    })
  }

  finishAndAlert(message: string) {
    this.data.success(message);
    this.ngOnInit();
  }

}
