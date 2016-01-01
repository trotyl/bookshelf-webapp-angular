import { Component } from 'angular2/core';
import { RouterOutlet, RouteConfig } from "angular2/router";
import { NavbarComponent } from './navbar.component';
import { BooksTableComponent } from "./books_table.component";

@Component({
    selector: 'app',
    template: `
        <navbar></navbar>
        <router-outlet></router-outlet>
    `,
    directives: [ NavbarComponent, RouterOutlet ]
})
@RouteConfig([
    { path: '/', name: 'BooksTable', component: BooksTableComponent }
])
export class AppComponent {

}