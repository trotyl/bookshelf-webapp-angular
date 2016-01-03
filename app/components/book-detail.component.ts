import { Component } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';
import { RouteParams } from 'angular2/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';

@Component({
    selector: 'book-detail',
    template: `
        <div class="page-header"><h2>Book Detail</h2></div>
        <form (ngSubmit)="onSubmit()" [ngClass]="{ disabled: true }">
            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input type="text" class="form-control" [ngModel]="book.isbn" placeholder="ISBN">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" [ngModel]="book.title" placeholder="Title">
            </div>
            <div class="form-group">
                <label for="title">Author</label>
                <input type="text" class="form-control" [ngModel]="book.author" placeholder="Title">
            </div>
            <div class="form-group">
                <label for="title">Category</label>
                <input type="text" class="form-control" [ngModel]="book.category" placeholder="Title">
            </div>
            <div class="form-group">
                <label for="title">Price</label>
                <input type="text" class="form-control" [ngModel]="book.price" placeholder="Title">
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
        </form>
    `,
    directives: [ FORM_DIRECTIVES ]
})
export class BookDetailComponent {
    private book: Book = {
        isbn: undefined,
        title: undefined,
        author: undefined,
        category: undefined,
        price: undefined
    };

    constructor(private routeParams: RouteParams, private bookService: BookService) {
        let isbn: string = routeParams.get('isbn');
        this.bookService.getBook(isbn).subscribe(book => this.book = book);
    }

    onSubmit() {

    }
}