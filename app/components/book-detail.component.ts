import { Component } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';
import { RouteParams } from 'angular2/router';
import { Observable } from 'rxjs/Rx';
import { BookEditComponent } from './book-edit.component';
import { BookFormComponent } from './book-form.component';
import { BookService } from '../services/services';
import { Book } from '../models/models';
import { ListPipe } from '../pipes/pipes';

@Component({
    selector: 'book-detail',
    template: `
        <div class="page-header"><h2>Book Detail</h2></div>
        <book-form [isbn]="isbn" [disabled]="true"></book-form>
    `,
    directives: [ FORM_DIRECTIVES, BookFormComponent ],
    pipes: [ ListPipe ]
})
export class BookDetailComponent {
    private isbn: string;

    constructor(private routeParams: RouteParams, private bookService: BookService) {
        this.isbn = routeParams.get('isbn');
    }
}