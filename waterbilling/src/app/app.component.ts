import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/admindashboard', icon: 'grid' },
    { title: 'Search', url: '/search', icon: 'search' },
    { title: 'Clients', url: '/clients', icon: 'people-circle' },
    { title: 'Bills', url: '/bills', icon: 'reader' },
    { title: 'Users', url: '/users', icon: 'person-circle' },
    { title: 'Metrics', url: '/metrics', icon: 'speedometer' },
    { title: 'Administrator',url: '/adminprofile', icon: 'person-circle' },
    { title: 'Logout', url: '/home', icon: 'power' },
  ];
  constructor() {}
 
  
}
