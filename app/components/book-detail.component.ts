import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { BookEditComponent } from './book-edit.component';
import { BookFormComponent } from './book-form.component';
import { Book } from "../models/book";
import { BookService } from "../services/book.service";

@Component({
    selector: 'book-detail',
    template: `
        <div class="page-header"><h2>Book Detail</h2></div>
        <book-form [book]="book" [editable]="false"></book-form>
    `,
    directives: [ BookFormComponent ]
})
export class BookDetailComponent implements OnInit {

    private book: Book = Book.empty();

    constructor(
        private routeParams: RouteParams,
        private bookService: BookService
    ) { }

    ngOnInit(): void {
        let isbn = this.routeParams.get('isbn');
        this.bookService.getBook(isbn).subscribe(book => this.book = book);
    }
}