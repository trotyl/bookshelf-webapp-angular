import { Component, OnInit } from 'angular2/core';
import { RouteParams, Router } from "angular2/router";
import { BookFormComponent } from "./book-form.component";
import { Book } from "../models/models";
import { BookService } from "../services/services";

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
        this.bookService.get(this.isbn).subscribe(book => {
            this.book = book;
            this.editable = true;
        });
    }

    updateBook(book: Book) {
        this.editable = false;
        this.bookService.update(this.isbn, book).subscribe(res => {
            if (res.status >= 200 && res.status < 300) {
                this.router.navigate(['BookDetail', { isbn: this.isbn }]);
            } else {
                alert('Update book failed due to network problem!');
                this.editable = true;
            }
        }, res => {
            console.log(res.status);
            this.editable = true;
        });
    }
}
