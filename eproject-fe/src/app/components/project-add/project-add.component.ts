import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  saving = false;
  project!: Project;
  url = "http://localhost:3030/v1/api/projects"

  @Output()
  saveFinish: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService) {
      this.project = new Project();
     }

  ngOnInit() {
  }

  open(content: TemplateRef<any>) {
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }

  save() {
    this.saving = true;
    this.rest.post(this.url, this.project).then(() => {
      this.saveFinish.emit('New project is saved!');
      this.saving = false;
      this.modelService.dismissAll();
      this.project = new Project();
    }).catch(res => {
      this.saving = false;
      this.data.error(res.error['message']);
    })
  }
}
