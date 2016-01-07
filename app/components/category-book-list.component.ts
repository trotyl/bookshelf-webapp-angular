import { Component, OnInit, ChangeDetectionStrategy } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES, RouteParams, CanReuse, OnReuse, ComponentInstruction } from 'angular2/router';
import { PaginationComponent } from './pagination.component';
import { CategoryNamePipe } from "../pipes/category_name";
import {Book} from "../models/book";
import {BookService} from "../services/book.service";

@Component({
    selector: 'category-book-list',
    template: `
        <div class="page-header">
            <h2>
                Book List
                <small>(Category: {{ categoryId | categoryName | async }})</small>
            </h2>
        </div>
        <table class="table">
            <thead>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Operations</th>
            </thead>
            <tbody>
                <tr *ngFor="#book of books">
                    <td>{{ book.isbn }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.price }}</td>
                    <td>
                        <a [routerLink]="['/BookDetail', { isbn: book?.isbn }]">Detail</a>
                        <a [routerLink]="['/BookEdit', { isbn: book?.isbn }]">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination [current]="currentPage" [total]="pages" [pageLink]="pageLink"></pagination>
    `,
    directives: [ COMMON_DIRECTIVES, ROUTER_DIRECTIVES, PaginationComponent ],
    pipes: [ CategoryNamePipe ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class CategoryBookListComponent implements OnInit {

    private categoryId: string;
    private books: Book[];
    private pages: number;
    private currentPage: number;

    private pageLink: { (page: number): any[] } = page => {
        if (page <= 0) page = 1;
        if (page >= this.pages) page = this.pages;
        return page > 1 ?
            ['CategoryBookListPage', { categoryId: this.categoryId, page: page }] :
            ['CategoryBookList', { categoryId: this.categoryId }];
    };

    constructor(
        private params: RouteParams,
        private bookService: BookService
    ) {}

    ngOnInit(): void {
        this.categoryId = this.params.get('categoryId');
        this.currentPage = parseInt(this.params.get('page')) || 1;
        this.bookService.getBooks((this.currentPage - 1) * 10, 10, book => book.categoryId == this.categoryId).subscribe(books => this.books = books);
        this.bookService.getAmountOfBooks(book => book.categoryId == this.categoryId).subscribe(num => this.pages = Math.floor(num / 10) + 1);
    }
}
