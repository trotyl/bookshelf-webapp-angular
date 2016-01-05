import { Component, Input } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { FORM_DIRECTIVES } from 'angular2/common';
import { Book } from '../models/models';
import { ListPipe, SplitPipe } from '../pipes/pipes';

@Component({
    selector: 'book-form',
    template: `
        <form (ngSubmit)="onSubmit()">
            <div class="form-group">
                <label for="isbn">ISBN</label>
                <input type="text" class="form-control" [(ngModel)]="book.isbn" [disabled]="true">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" [(ngModel)]="book.title" [disabled]="true">
            </div>
            <div class="form-group">
                <label for="title">Author</label>
                <input type="text" class="form-control" [ngModel]="book.author | list" (ngModelChange)="book.author = $event | split" [disabled]="true">
            </div>
            <div class="form-group">
                <label for="title">Category</label>
                <input type="text" class="form-control" [ngModel]="book.category?.name" [disabled]="true">
            </div>
            <div class="form-group">
                <label for="title">Price</label>
                <input type="text" class="form-control" [(ngModel)]="book.price" [disabled]="true">
            </div>
            <button type="submit" class="btn btn-default" *ngIf="false">Submit</button>
        </form>
    `,
    directives: [ COMMON_DIRECTIVES, FORM_DIRECTIVES ],
    pipes: [ ListPipe, SplitPipe ]
})
export class BookFormComponent {
    //@Input() private book: Book;

    constructor() {

    }

    onSubmit() {

    }
}
