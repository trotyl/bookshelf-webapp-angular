import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from "angular2/router";
import { CategoryBookListComponent } from "./category-book-list.component";

@Component({
    selector: 'category',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [ ROUTER_DIRECTIVES ]
})
@RouteConfig([
    { path: '/:categoryId', name: 'CategoryBookList', component: CategoryBookListComponent, useAsDefault: true },
    { path: '/:categoryId/pages/:page', name: 'CategoryBookListPage', component: CategoryBookListComponent },
])
export class CategoryBookComponent {

}