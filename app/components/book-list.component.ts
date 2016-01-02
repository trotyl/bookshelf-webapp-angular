import { Component, Input } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouterLink, Location, RouteParams, RouteConfig } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';
import { RangePipe } from '../pipes/range.pipe';


@Component({
    selector: 'book-list',
    template: `
        <div class="page-header"><h2>Book List</h2></div>
        <table class="table">
            <thead>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Price</th>
            </thead>
            <tbody>
                <tr *ngFor="#book of books">
                    <td>{{ book?.isbn }}</td>
                    <td>{{ book?.title }}</td>
                    <td>{{ book?.author }}</td>
                    <td>{{ book?.category?.name }}</td>
                    <td>{{ book?.price }}</td>
                </tr>
            </tbody>
        </table>
        <nav class="text-center">
          <ul class="pagination">
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li *ngFor="#page of pages | range:1">
                <a *ngIf="page == 1" [routerLink]="['BookList']">{{ page }}</a>
                <a *ngIf="page > 1" [routerLink]="['BookListPage', { page: page }]">{{ page }}</a>
            </li>
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
    `,
    directives: [ COMMON_DIRECTIVES, RouterLink ],
    pipes: [ RangePipe ]
})
export class BookListComponent {
    private books: Book[];
    private pages: number;
    private currentPage: number;

    constructor(private router: Router, private location: Location, private params: RouteParams, private bookService: BookService) {
        var page = params.get('page') || 1;

        bookService.getBooks((page as number - 1) * 10).subscribe(books => this.books = books);
        bookService.getNumberOfBooks().subscribe(num => this.pages = Math.floor(num / 10) + 1);
    }
}
