import { Component } from 'angular2/core';
import { RouterOutlet, RouteConfig } from "angular2/router";
import { CategoryBookListComponent } from "./category-book-list.component";

@Component({
    selector: 'category',
    template: `
        <routerOutlet></routerOutlet>
    `,
    directives: [ RouterOutlet ]
})
@RouteConfig([
    { path: '/:categoryId', name: 'CategoryBookList', component: CategoryBookListComponent, useAsDefault: true },
    { path: '/:categoryId/pages/:page', name: 'CategoryBookListPage', component: CategoryBookListComponent },
])
export class CategoryBookComponent {

}