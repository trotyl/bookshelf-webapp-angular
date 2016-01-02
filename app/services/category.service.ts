import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Book } from "../models/book";
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
    getCategory(id: string): Observable<Category> {
        return Observable.create((observer) => observer.next({
            id: id,
            name: 'Computer & Technology'
        }));
    }
}