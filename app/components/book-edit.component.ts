import { Component } from 'angular2/core';
import { RouteParams, Router } from "angular2/router";
import { Http } from "angular2/http";
import { BookFormComponent } from "./book-form.component";
import { Book } from "../models/models";
import { BookService } from "../services/services";
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'book-edit',
    template: `
        <div class="page-header"><h2>Book Edit <small *ngIf="disabled">(Updating...)</small></h2></div>
        <book-form [isbn]="isbn" [disabled]="disabled" (bookSubmit)="updateBook($event)"></book-form>
    `,
    directives: [ BookFormComponent ]
})
export class BookEditComponent {
    private isbn: string;
    private disabled: boolean = false;

    constructor(private router: Router, private routeParams: RouteParams, private bookService: BookService) {
        this.isbn = routeParams.get('isbn');
    }

    updateBook(book: Book) {
        this.disabled = true;
        this.bookService.updateBook(this.isbn, book).subscribe(response => {
            if (response.status >= 200 && response.status < 300) {
                this.router.navigate(['BookDetail', { isbn: this.isbn }]);
            } else {
                alert('Update book failed due to network problem!');
                this.disabled = false;
            }
        }, response => {
            console.log(response.status);
            this.disabled = false;
        });
    }
}
