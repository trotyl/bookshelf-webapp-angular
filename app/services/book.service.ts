import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip-static';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { Book } from "../models/book";
import { Category } from '../models/category';
import { CategoryService } from './category.service';

@Injectable()
export class BookService {
    private observableBooks: Observable<Book[]>;
    private cachedBooks: Map<string, Book>;

    constructor(private http: Http, private categoryService: CategoryService) {
        this.cachedBooks = new Map<string, Book>();
        this.observableBooks = http.get('/api/books')
            .map(res => res.json())
            .mergeMap<Book[]>(array => this.parseBooks(array))
            .do(books => books.forEach(book => this.cachedBooks.set(book.isbn, book)));
    }

    private getAllBooks(): Observable<Book[]> {
        let observableCachedBooks: Observable<any> = this.cachedBooks && this.cachedBooks.size != 0 ?
            Observable.of(Array.from(this.cachedBooks.values())) :
            Observable.throw(new Error('Books not found in cache.'));

        return observableCachedBooks.catch(() => this.observableBooks);
    }

    getBooks(start: number = 0, amount: number = 10): Observable<Book[]> {
        return this.getAllBooks().map(books => books.filter((_, i) => i >= start && i < start + amount));
    }

    getNumberOfBooks(): Observable<number> {
        return this.getAllBooks().map(books => books.length);
    }

    parseBooks(array: BookJson[]): Observable<Book[]> {
        let observableCatories = array.map(json => this.categoryService.getCategory(json.categoryId));

        return Observable.zip(...observableCatories, (...categories) => categories)
            .map(categories => categories.map((category, i) => ({
                isbn: array[i].isbn,
                title: array[i].title,
                author: array[i].author,
                category: category,
                price: array[i].price
            })));
    }
}

interface BookJson {
    isbn: string,
    title: string,
    author: string[],
    categoryId: string,
    price: number
}
