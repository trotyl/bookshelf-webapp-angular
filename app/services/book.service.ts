import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from "../models/book";
import { Category } from '../models/category';
import { CategoryService } from './category.service';

@Injectable()
export class BookService {
    private books: Observable<Book[]>;

    constructor(private http: Http, private categoryService: CategoryService) {
        this.books = http.get('/api/books')
            .map(res => res.json());
    }

    getBooks(start: number = 0, amount: number = 10): Observable<Book[]> {
        return this.books.map(books => books.filter((_, i) => i >= start && i < start + amount));
    }
}
