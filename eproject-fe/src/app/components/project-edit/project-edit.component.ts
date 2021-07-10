import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  saving = false;
  project!: Project;
  url = "http://localhost:3030/v1/api/projects"

  @Input("id")
  projectId!: string


  @Output()
  updateFinish: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService) {
     }

  ngOnInit() {
    this.saving = true;
    this.rest.get(this.url, this.projectId).then((res: any) => {
      this.project = res.data;
      this.saving = false;
    }).catch(res => {
      this.saving = false;
      this.data.error(res.error['message']);
    })
  }

  open(content: TemplateRef<any>) {
    this.data.message = '';
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }

  update() {
    this.saving = true;
    this.rest.put(this.url, this.projectId, this.project).then(() => {
      this.updateFinish.emit('Project is updated!');
      this.saving = false;
      this.modelService.dismissAll();
      this.project = new Project();
    }).catch(res => {
      this.saving = false;
      this.data.error(res.error['message']);
    })
  }
}
