import { Injectable, OnInit } from 'angular2/core';
import { Http, Response, Headers } from 'angular2/http';
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

    private cachedBooks: Map<string, Book> = new Map<string, Book>();
    private observableBooks: Observable<Book[]> = this.getAllBooksOffline()
        .catch(() => this.getAllBooksOnline());

    constructor(private http: Http) {
        Observable.of(0)
            .merge(Observable.interval(60000))
            .mergeMap(() => this.getAllBooksOnline()).subscribe();
    }

    private getSingleBookOnline(isbn: string): Observable<Book> {
        return this.http.get(`/api/books/${isbn}`)
            .map(res => res.json())
            .map(obj => Book.from(obj))
            .do(book => this.cachedBooks.set(book.isbn, book));
    }

    private getSingleBookOffine(isbn: string): Observable<Book> {
        return this.cachedBooks.has(isbn) ?
            Observable.of(this.cachedBooks.get(isbn)) :
            Observable.throw<Book>(new Error('Book not found in cache.'));
    }

    private getAllBooksOnline(): Observable<Book[]> {
        return this.http.get(`/api/books`)
            .map(res => res.json())
            .map(objs => objs.map(obj => Book.from(obj)))
            .do(books => books.forEach(book => this.cachedBooks.set(book.isbn, book)));
    }

    private getAllBooksOffline(): Observable<Book[]> {
        return this.cachedBooks.size != 0 ?
            Observable.of(Array.from(this.cachedBooks.values())) :
            Observable.throw<Book[]>(new Error('Books not found in cache.'));
    }

    getBook(isbn: string) {
        return this.getSingleBookOffine(isbn)
            .catch(() => this.getSingleBookOnline(isbn));
    }

    getBooks(
        start: number = 0,
        amount: number = 10,
        condition: { (book: Book): boolean } = () => true
    ): Observable<Book[]> {
        return this.observableBooks
            .map(books => books.filter(condition).filter((_, i) => i >= start && i < start + amount));
    }

    getAmountOfBooks(condition: { (book: Book): boolean } = () => true): Observable<number> {
        return this.observableBooks.map(books => books.filter(condition).length);
    }

    updateBook(isbn: string, book: Book): Observable<Response> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.put(`/api/books/${isbn}`, book.toJson(), { headers: headers})
            .do(() => {
                this.getSingleBookOnline(book.isbn).subscribe();
                isbn != book.isbn && this.checkBookExists(isbn);
            });
    }

    createBook(book: Book): Observable<Response> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(`/api/books`, book.toJson(), { headers: headers })
            .do(() => this.getSingleBookOnline(book.isbn).subscribe());
    }

    checkBookExists(isbn: string): Observable<boolean> {
        return this.http.get(`/api/books/${isbn}/exists`)
            .map(res => res.json())
            .do(exists => !exists && this.cachedBooks.has(isbn) && this.cachedBooks.delete(isbn));
    }

    deleteBook(isbn: string): Observable<Response> {
        return this.http.delete(`/api/books/${isbn}`);
    }
}
