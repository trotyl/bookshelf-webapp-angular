import { Component } from 'angular2/core';
import { ROUTER_PROVIDERS, RouterOutlet, RouteConfig } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { BookListComponent } from './book-list.component';
import { BookDetailComponent } from './book-detail.component';
import { BookEditComponent } from './book-edit.component';
import { BookCategoryComponent } from './book-category.component';
import { BookCreateComponent } from './book-create.component';
import { BookService, CategoryService } from '../services/services';

@Component({
    selector: 'app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
        <footer></footer>
    `,
    directives: [ NavbarComponent, FooterComponent, RouterOutlet ],
    providers: [ ROUTER_PROVIDERS, HTTP_PROVIDERS, BookService, CategoryService ]
})
@RouteConfig([
    { path: '/', name: 'BookList', component: BookListComponent, useAsDefault: true },
    { path: '/pages/:page', name: 'BookListPage', component: BookListComponent },
    { path: '/categories/:category', name: 'BookCategory', component: BookCategoryComponent },
    { path: '/books/:isbn', name: 'BookDetail', component: BookDetailComponent },
    { path: '/books/:isbn/edit', name: 'BookEdit', component: BookEditComponent },
    { path: '/create', name: 'BookCreate', component: BookCreateComponent }
])
export class AppComponent {

}