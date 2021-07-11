import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  projectId!: string;
  confirmMessage = '';

  constructor(private rest: RestApiService, 
    private data: DataService,
    private modalService: NgbModal) { 

   }

   showDeleteModal(confirmDialog: TemplateRef<any>, id: string, name: string) {
    this.confirmMessage = `Do you want to delete project ${name}?`;
    this.projectId = id;
    this.modalService.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'});
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

  delete() {
    if(this.projectId) {
      this.rest.delete(this.url, this.projectId).then((res: any) => {
        this.projectId = '';
        this.data.success(res['message']);
        this.modalService.dismissAll();
        setTimeout(() => {
          this.ngOnInit();
        }, 500);
      })
      .catch(res => {
        this.data.error(res.error['message']);
      })
    }
  }

  finishAndAlert(message: string) {
    this.data.success(message);
    this.ngOnInit();
  }

}
