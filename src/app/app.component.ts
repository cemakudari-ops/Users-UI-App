import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Users UI App</h1>
    <nav>
      <a routerLink="/add" routerLinkActive="active">Add User</a>
      <a routerLink="/list" routerLinkActive="active">List Users</a>
    </nav>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent { }
