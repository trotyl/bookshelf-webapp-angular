import { Component, Input, Output, OnInit, EventEmitter } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { FORM_DIRECTIVES } from 'angular2/common';
import { Book } from '../models/models';
import { ListPipe, SplitPipe } from '../pipes/pipes';
import {Observable} from "rxjs/Observable";
import {BookService} from "../services/book.service";
import {Category} from "../models/category";
import {CategoryService} from "../services/category.service";

@Component({
    selector: 'book-form',
    template: `
        <form (ngSubmit)="bookSubmit.emit(book)">
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
                <select class="form-control" [(ngModel)]="book.categoryId" [disabled]="disabled">
                    <option *ngFor="#category of allCategories" [value]="category.id">{{ category.name }}</option>
                </select>
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
    private book: Book = Book.empty();
    private allCategories: Category[] = [];

    @Input() private isbn: string;
    @Input() private disabled: boolean;
    @Output() private bookSubmit: EventEmitter<Book> = new EventEmitter();

    constructor(private bookService: BookService, private categoryService: CategoryService, private splitPipe: SplitPipe) {
        categoryService.getCategories().subscribe(categories => this.allCategories = categories);
    }

    ngOnInit() {
        this.bookService.getBook(this.isbn).subscribe(book => this.book = book);
    }

    onAuthorChange(author: string) {
        this.book.author = this.splitPipe.transform(author, [',', true]);
        console.log(this.book.author);
    }
}
