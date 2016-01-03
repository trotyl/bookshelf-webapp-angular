import { Injectable, OnInit } from 'angular2/core';
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
    }

    private getSingleBook(isbn: string): Observable<Book> {
        let observableCachedBook: Observable<any> = this.cachedBooks && this.cachedBooks.has(isbn) ?
            Observable.of(this.cachedBooks.get(isbn)) :
            Observable.throw(new Error('Book not found in cache.'));

        let observableOnlineBook = this.http.get(`/api/books/${isbn}`)
            .map(res => res.json())
            .mergeMap<Book>(json => this.parseBook(json))
            .do(book => this.cachedBooks.set(book.isbn, book));

        return observableCachedBook.catch(() => observableOnlineBook);
    }

    private getAllBooks(): Observable<Book[]> {
        let observableCachedBooks: Observable<any> = this.cachedBooks && this.cachedBooks.size != 0 ?
            Observable.of(Array.from(this.cachedBooks.values())) :
            Observable.throw(new Error('Books not found in cache.'));

        let observableOnlineBooks = this.http.get(`/api/books`)
            .map(res => res.json())
            .mergeMap<Book[]>(array => this.parseBooks(array))
            .do(books => books.forEach(book => this.cachedBooks.set(book.isbn, book)));

        return observableCachedBooks.catch(() => observableOnlineBooks);
    }

    private parseBook(json: BookJson): Observable<Book> {
        return this.categoryService.getCategory(json.categoryId)
            .map(category => ({
                isbn: json.isbn,
                title: json.title,
                author: json.author,
                category: category,
                price: json.price
            }));
    }

    private parseBooks(array: BookJson[]): Observable<Book[]> {
        let observablesOfBook = array.map(json => this.parseBook(json));

        return Observable.zip(...observablesOfBook, (...books) => books);
    }

    getBook(isbn: string) {
        return this.getSingleBook(isbn);
    }

    getBooks(start: number = 0, amount: number = 10): Observable<Book[]> {
        return this.getAllBooks().map(books => books.filter((_, i) => i >= start && i < start + amount));
    }

    getAmountOfBooks(): Observable<number> {
        return this.getAllBooks().map(books => books.length);
    }
}

interface BookJson {
    isbn: string,
    title: string,
    author: string[],
    categoryId: string,
    price: number
}
