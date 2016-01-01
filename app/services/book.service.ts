import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from "../models/book";
import { Category } from '../models/category';

@Injectable()
export class BookService {
    private books: Observable<Book[]>;

    constructor(private http: Http) {
        this.books = http.get('/api/books').map(res => res.json());
    }

    getBooks(start: number = 0, amount: number = 10): Observable<Book[]> {
        var category: Category = { id: 0, name: 'Computer & Technology' };

        return this.books.map(books => books.filter((book, index) => index >= start && index < start + amount));
    }
}