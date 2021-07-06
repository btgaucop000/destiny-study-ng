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
  userInfo: any;
  isLogin = false;

  constructor(public data: DataService, private router: Router) {
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('userName')) {
      this.isLogin = true;
      this.userInfo = sessionStorage.getItem('userName');
    } else {
      this.router.navigate(['/']);
    }
    
  }

  logout() {
    this.data.employee = null;
    this.isLogin = false;
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
