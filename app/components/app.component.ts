import { Component } from 'angular2/core';
import { RouterOutlet, RouteConfig } from 'angular2/router';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { BookListComponent } from './book-list.component';
import { BookDetailComponent } from './book-detail.component';
import { BookCreateComponent } from './book-create.component';
import { BookService } from '../services/book.service';

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
    providers: [ BookService ]
})
@RouteConfig([
    { path: '/', name: 'BookList', component: BookListComponent },
    { path: '/books/:id', name: 'BookDetail', component: BookDetailComponent },
    { path: '/create', name: 'BookCreate', component: BookCreateComponent }
])
export class AppComponent {

}