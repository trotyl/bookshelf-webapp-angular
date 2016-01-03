import { Component, Input, OnInit } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, RouteParams, CanReuse, OnReuse, ComponentInstruction } from 'angular2/router';
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
                <th>Operations</th>
            </thead>
            <tbody>
                <tr *ngFor="#book of books">
                    <td>{{ book?.isbn }}</td>
                    <td>{{ book?.title }}</td>
                    <td>{{ book?.author }}</td>
                    <td>{{ book?.category?.name }}</td>
                    <td>{{ book?.price }}</td>
                    <td>
                        <a [routerLink]="['/BookDetail', { isbn: book?.isbn }]">Detail</a>
                        <a [routerLink]="['/BookEdit', { isbn: book?.isbn }]">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination [current]="currentPage" [total]="pages"></pagination>
    `,
    directives: [ COMMON_DIRECTIVES, ROUTER_DIRECTIVES, PaginationComponent ]
})
export class BookListComponent implements CanReuse, OnReuse, OnInit {
    private books: Book[];
    private pages: number;
    private currentPage: number;

    constructor(private params: RouteParams, private bookService: BookService) {
        this.currentPage = parseInt(params.get('page')) || 1;
    }

    ngOnInit() {
        this.bookService.getBooks((this.currentPage - 1) * 10).subscribe(books => this.books = books);
        this.bookService.getNumberOfBooks().subscribe(num => this.pages = Math.floor(num / 10) + 1);
    }

    routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) {
        return true;
    }

    routerOnReuse(next: ComponentInstruction, prev: ComponentInstruction) {
        this.currentPage = parseInt(next.params['page']) || 1;
        this.ngOnInit();
    }
}
