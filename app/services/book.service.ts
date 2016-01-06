import { Injectable, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip-static';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { Book } from "../models/models";
import { Category } from '../models/category';
import { CategoryService } from './category.service';

@Injectable()
export class BookService {
    private observableBooks: Observable<Book[]>;
    private cachedBooks: Map<string, Book>;

    constructor(private http: Http, private categoryService: CategoryService) {
        this.cachedBooks = new Map<string, Book>();
        this.getAllBooksOnline();
        this.observableBooks = this.getAllBooksOffline()
            .catch(() => this.getAllBooksOnline())
    }

    private getSingleBookOnline(isbn: string): Observable<Book> {
        return this.http.get(`/api/books/${isbn}`)
            .map(res => res.json())
            .mergeMap<Book>(json => this.parseBook(json))
            .do(book => this.cachedBooks.set(book.isbn, book));
    }

    private getSingleBookOffine(isbn: string): Observable<Book> {
        return this.cachedBooks && this.cachedBooks.has(isbn) ?
            Observable.of(this.cachedBooks.get(isbn)) :
            Observable.throw<Book>(new Error('Book not found in cache.'));
    }

    private getAllBooksOnline(): Observable<Book[]> {
        return this.http.get(`/api/books`)
            .map(res => res.json())
            .mergeMap<Book[]>(array => this.parseBooks(array))
            .do(books => books.forEach(book => this.cachedBooks.set(book.isbn, book)));
    }

    private getAllBooksOffline(): Observable<Book[]> {
        return this.cachedBooks && this.cachedBooks.size != 0 ?
            Observable.of(Array.from(this.cachedBooks.values())) :
            Observable.throw<Book[]>(new Error('Books not found in cache.'));
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
        return this.getSingleBookOffine(isbn)
            .catch(() => this.getSingleBookOnline(isbn));
    }

    getBooks(start: number = 0, amount: number = 10): Observable<Book[]> {
        return this.observableBooks
            .map(books => books.filter((_, i) => i >= start && i < start + amount));
    }

    getAmountOfBooks(): Observable<number> {
        return this.observableBooks.map(books => books.length);
    }

    updateBook(isbn: string, book: Book): Observable<boolean> {
        // Todo
        return Observable.of(true);
    }
}

interface BookJson {
    isbn: string,
    title: string,
    author: string[],
    categoryId: string,
    price: number
}
