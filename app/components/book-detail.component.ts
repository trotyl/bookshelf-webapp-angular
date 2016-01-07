import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { BookEditComponent } from './book-edit.component';
import { BookFormComponent } from './book-form.component';

@Component({
    selector: 'book-detail',
    template: `
        <div class="page-header"><h2>Book Detail</h2></div>
        <book-form [isbn]="isbn" [editable]="false"></book-form>
    `,
    directives: [ BookFormComponent ]
})
export class BookDetailComponent {
    private isbn: string;

    constructor(private routeParams: RouteParams) {
        this.isbn = routeParams.get('isbn');
    }
}