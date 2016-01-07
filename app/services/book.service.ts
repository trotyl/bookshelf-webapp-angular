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
    private observableBooks: Observable<Book[]> = this.getGroupOffline()
        .catch(() => this.getGroupOnline());

    constructor(private http: Http) {
        Observable.of(0)
            .merge(Observable.interval(60000))
            .mergeMap(() => this.getGroupOnline()).subscribe();
    }

    private getOneOnline(isbn: string): Observable<Book> {
        return this.http.get(`/api/books/${isbn}`)
            .map(res => res.json())
            .map(obj => Book.from(obj))
            .do(book => this.cachedBooks.set(book.isbn, book));
    }

    private getOneOffine(isbn: string): Observable<Book> {
        return this.cachedBooks.has(isbn) ?
            Observable.of(this.cachedBooks.get(isbn)) :
            Observable.throw<Book>(new Error('Book not found in cache.'));
    }

    private getGroupOnline(): Observable<Book[]> {
        return this.http.get(`/api/books`)
            .map(res => res.json())
            .map(objs => objs.map(obj => Book.from(obj)))
            .do(books => books.forEach(book => this.cachedBooks.set(book.isbn, book)));
    }

    private getGroupOffline(): Observable<Book[]> {
        return this.cachedBooks.size != 0 ?
            Observable.of(Array.from(this.cachedBooks.values())) :
            Observable.throw<Book[]>(new Error('Books not found in cache.'));
    }

    get(isbn: string) {
        return this.getOneOffine(isbn)
            .catch(() => this.getOneOnline(isbn));
    }

    gets(
        start: number = 0,
        amount: number = 10,
        condition: { (book: Book): boolean } = () => true
    ): Observable<Book[]> {
        return this.observableBooks
            .map(books => books.filter(condition).filter((_, i) => i >= start && i < start + amount));
    }

    getAmount(condition: { (book: Book): boolean } = () => true): Observable<number> {
        return this.observableBooks.map(books => books.filter(condition).length);
    }

    update(isbn: string, book: Book): Observable<Response> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.put(`/api/books/${isbn}`, book.toJson(), { headers: headers})
            .do(() => {
                isbn != book.isbn && this.cachedBooks.has(isbn) && this.cachedBooks.delete(isbn);
                this.getOneOnline(book.isbn).subscribe();
            });
    }

    create(book: Book): Observable<Response> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(`/api/books`, book.toJson(), { headers: headers })
            .do(() => this.getOneOnline(book.isbn).subscribe());
    }

    remove(isbn: string): Observable<Response> {
        return this.http.delete(`/api/books/${isbn}`)
            .do(() => this.cachedBooks.has(isbn) && this.cachedBooks.delete(isbn));
    }
}
