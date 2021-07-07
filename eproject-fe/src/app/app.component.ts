import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eproject-fe';

  constructor(public data: DataService, private router: Router) {
    this.data.getProfile();
  }

  logout() {
    this.data.employee = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
