import { Component, Input } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { RouteParams } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { PaginationComponent } from './pagination.component';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';

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
        <pagination [current]="currentPage" [total]="pages"></pagination>
    `,
    directives: [ COMMON_DIRECTIVES, PaginationComponent ]
})
export class BookListComponent {
    private books: Book[];
    private pages: number;
    private currentPage: number;

    constructor(private params: RouteParams, private bookService: BookService) {
        this.currentPage = params.get('page') as number || 1;

        bookService.getBooks((this.currentPage - 1) * 10).subscribe(books => this.books = books);
        bookService.getNumberOfBooks().subscribe(num => this.pages = Math.floor(num / 10) + 1);
    }
}
