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
                <input type="text" class="form-control" [ngModel]="book.isbn" [disabled]="true">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" [ngModel]="book.title" [disabled]="true">
            </div>
            <div class="form-group">
                <label for="title">Author</label>
                <input type="text" class="form-control" [ngModel]="book.author" [disabled]="true">
            </div>
            <div class="form-group">
                <label for="title">Category</label>
                <input type="text" class="form-control" [ngModel]="book.category" [disabled]="true">
            </div>
            <div class="form-group">
                <label for="title">Price</label>
                <input type="text" class="form-control" [ngModel]="book.price" [disabled]="true">
            </div>
            <button type="submit" class="btn btn-default" *ngIf="false">Submit</button>
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