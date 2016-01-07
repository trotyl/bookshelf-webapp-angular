import { Component, OnInit } from 'angular2/core';
import { Router } from "angular2/router";
import { Book } from "../models/book";
import { BookService } from "../services/book.service";
import { BookFormComponent } from "./book-form.component";

@Component({
    selector: 'book-create',
    template: `
        <div class="page-header"><h2>Book Create</h2></div>
        <book-form [book]="book" [editable]="editable" (bookSubmit)="createBook($event)"></book-form>
    `,
    directives: [ BookFormComponent ]
})
export class BookCreateComponent implements OnInit {

    private editable: boolean = true;
    private book: Book = Book.empty();

    constructor(
        private bookService: BookService,
        private router: Router
    ) { }

    ngOnInit(): void {

    }

    createBook(book: Book): void {
        this.editable = false;
        this.bookService.createBook(book).subscribe(res => {
            if (res.status >= 200 && res.status < 300) {
                this.router.navigate(['BookDetail', { isbn: book.isbn }]);
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