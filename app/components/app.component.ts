import { Component } from 'angular2/core';
import { ROUTER_PROVIDERS, RouterOutlet, RouteConfig } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { BookCreateComponent } from './book-create.component';
import { BookDetailComponent } from './book-detail.component';
import { BookEditComponent } from './book-edit.component';
import { BookListComponent } from './book-list.component';
import { FooterComponent } from './footer.component';
import { NavbarComponent } from './navbar.component';
import { BookService, CategoryService } from '../services/services';
import { CategoryBookComponent } from "./category-book.component";

@Component({
    selector: 'app',
    template: `
        <navbar></navbar>
        <div class="container">
            <routerOutlet></routerOutlet>
        </div>
        <footer></footer>
    `,
    directives: [ NavbarComponent, FooterComponent, RouterOutlet ],
    providers: [ ROUTER_PROVIDERS, HTTP_PROVIDERS, BookService, CategoryService ]
})
@RouteConfig([
    { path: '/', name: 'BookList', component: BookListComponent, useAsDefault: true },
    { path: '/pages/:page', name: 'BookListPage', component: BookListComponent },
    { path: '/categories/...', name: 'CategoryBook', component: CategoryBookComponent },
    { path: '/books/:isbn', name: 'BookDetail', component: BookDetailComponent },
    { path: '/books/:isbn/edit', name: 'BookEdit', component: BookEditComponent },
    { path: '/create', name: 'BookCreate', component: BookCreateComponent }
])
export class AppComponent {

}