import { Component } from 'angular2/core';
import { RouterOutlet, RouteConfig } from "angular2/router";
import { NavbarComponent } from './navbar.component';
import { BookListComponent } from "./book-list.component";
import { BookDetailComponent } from './book-detail.component';

@Component({
    selector: 'app',
    template: `
        <navbar></navbar>
        <router-outlet></router-outlet>
    `,
    directives: [ NavbarComponent, RouterOutlet ]
})
@RouteConfig([
    { path: '/', name: 'BookList', component: BookListComponent },
    { path: '/books/:id', name: 'BookDetail', component: BookDetailComponent }
])
export class AppComponent {

}