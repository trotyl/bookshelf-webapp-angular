import { Component } from 'angular2/core';
import { RouteParams } from "angular2/router";
import { BookFormComponent } from "./book-form.component";

@Component({
    selector: 'book-edit',
    template: `
        <div class="page-header"><h2>Book Edit</h2></div>
        <book-form [isbn]="isbn" [disabled]="false"></book-form>
    `,
    directives: [ BookFormComponent ]
})
export class BookEditComponent {
    private isbn: string;

    constructor(private routeParams: RouteParams) {
        this.isbn = routeParams.get('isbn');
    }
}
