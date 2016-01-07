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
                <input type="text" class="form-control" [(ngModel)]="book.isbn" [disabled]="!editable">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" [(ngModel)]="book.title" [disabled]="!editable">
            </div>
            <div class="form-group">
                <label for="title">Author</label>
                <input type="text" class="form-control" [ngModel]="book.author | list" (ngModelChange)="onAuthorChange($event)" [disabled]="!editable">
            </div>
            <div class="form-group">
                <label for="title">Category</label>
                <select class="form-control" [(ngModel)]="book.categoryId" [disabled]="!editable">
                    <option *ngFor="#category of allCategories" [value]="category.id">{{ category.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="title">Price</label>
                <input type="text" class="form-control" [(ngModel)]="book.price" [disabled]="!editable">
            </div>
            <button type="submit" class="btn btn-default" *ngIf="editable">Submit</button>
        </form>
    `,
    directives: [ COMMON_DIRECTIVES, FORM_DIRECTIVES ],
    pipes: [ ListPipe, SplitPipe ],
    providers: [ SplitPipe ]
})
export class BookFormComponent implements OnInit {

    private allCategories: Category[] = [];

    @Input() private book: Book;
    @Input() private editable: boolean;
    @Output() private bookSubmit: EventEmitter<Book> = new EventEmitter();

    constructor(
        private categoryService: CategoryService,
        private splitPipe: SplitPipe
    ) { }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(categories => this.allCategories = categories);
    }

    onAuthorChange(author: string) {
        this.book.author = this.splitPipe.transform(author, [',', true]);
        console.log(this.book.author);
    }
}
