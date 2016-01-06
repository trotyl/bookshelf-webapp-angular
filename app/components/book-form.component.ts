import { Component, Input, OnInit } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { FORM_DIRECTIVES } from 'angular2/common';
import { Book } from '../models/models';
import { ListPipe, SplitPipe } from '../pipes/pipes';
import {Observable} from "rxjs/Observable";
import {BookService} from "../services/book.service";

@Component({
    selector: 'book-form',
    template: `
        <form (ngSubmit)="onSubmit()">
            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input type="text" class="form-control" [(ngModel)]="book.isbn" [disabled]="disabled">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" [(ngModel)]="book.title" [disabled]="disabled">
            </div>
            <div class="form-group">
                <label for="title">Author</label>
                <input type="text" class="form-control" [ngModel]="book.author | list" (ngModelChange)="onAuthorChange($event)" [disabled]="disabled">
            </div>
            <div class="form-group">
                <label for="title">Category</label>
                <input type="text" class="form-control" [ngModel]="book.category?.name" [disabled]="disabled">
            </div>
            <div class="form-group">
                <label for="title">Price</label>
                <input type="text" class="form-control" [(ngModel)]="book.price" [disabled]="disabled">
            </div>
            <button type="submit" class="btn btn-default" *ngIf="!disabled">Submit</button>
        </form>
    `,
    directives: [ COMMON_DIRECTIVES, FORM_DIRECTIVES ],
    pipes: [ ListPipe, SplitPipe ],
    providers: [ SplitPipe ]
})
export class BookFormComponent implements OnInit {
    private book: Book = {
        isbn: undefined,
        title: undefined,
        author: undefined,
        category: undefined,
        price: undefined
    };

    @Input() private isbn: string;
    @Input() private disabled: boolean;

    constructor(private bookService: BookService, private splitPipe: SplitPipe) {

    }

    ngOnInit() {
        this.bookService.getBook(this.isbn).subscribe(book => this.book = book);
    }

    onAuthorChange(author: string) {
        this.book.author = this.splitPipe.transform(author, [',', true]);
    }

    onSubmit() {

    }
}
