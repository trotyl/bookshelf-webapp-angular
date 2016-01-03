import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/zip-static';
import 'rxjs/add/operator/mergeMap';
import { Book } from "../models/book";
import { Category } from '../models/category';
import { CategoryService } from './category.service';

@Injectable()
export class BookService {
    private booksObservable: Observable<Book[]>;

    constructor(private http: Http, private categoryService: CategoryService) {
        this.booksObservable = http.get('/api/books')
            .map(res => res.json())
            .mergeMap(array => this.parseBooks(array));
    }

    getBooks(start: number = 0, amount: number = 10): Observable<Book[]> {
        return this.booksObservable.map(books => books.filter((_, i) => i >= start && i < start + amount));
    }

    getNumberOfBooks(): Observable<number> {
        return this.booksObservable.map(books => books.length);
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
