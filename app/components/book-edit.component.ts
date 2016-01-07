import { Component, OnInit } from 'angular2/core';
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
        <book-form [book]="book" [editable]="editable" (bookSubmit)="updateBook($event)"></book-form>
    `,
    directives: [ BookFormComponent ]
})
export class BookEditComponent implements OnInit {

    private isbn: string;
    private editable: boolean = false;
    private book: Book = Book.empty();

    constructor(
        private router: Router,
        private routeParams: RouteParams,
        private bookService: BookService
    ) { }

    ngOnInit() {
        this.isbn = this.routeParams.get('isbn');
        this.bookService.getBook(this.isbn).subscribe(book => {
            this.book = book;
            this.editable = true;
        });
    }

    updateBook(book: Book) {
        this.editable = false;
        this.bookService.updateBook(this.isbn, book).subscribe(response => {
            if (response.status >= 200 && response.status < 300) {
                this.router.navigate(['BookDetail', { isbn: this.isbn }]);
            } else {
                alert('Update book failed due to network problem!');
                this.editable = true;
            }
        }, response => {
            console.log(response.status);
            this.editable = true;
        });
    }
}
