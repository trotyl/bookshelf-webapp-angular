import { Component, Input } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { Observable } from 'rxjs/Observable';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';


@Component({
    selector: 'book-list',
    template: `
        <div class="page-header"><h2>Book List</h2></div>
        <table class="table">
            <thead>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Price</th>
            </thead>
            <tbody>
                <tr *ngFor="#book of books | async">
                    <td>{{ book?.isbn }}</td>
                    <td>{{ book?.title }}</td>
                    <td>{{ book?.author }}</td>
                    <td>{{ book?.category?.name }}</td>
                    <td>{{ book?.price }}</td>
                </tr>
            </tbody>
        </table>
    `,
    directives: [ NgFor ]
})
export class BookListComponent {
    private books: Observable<Book[]>;

    constructor(private bookService: BookService) {
        this.books = bookService.getBooks();
    }
}