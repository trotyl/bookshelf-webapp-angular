import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Book } from "../models/book";
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
    private observableCategories: Observable<Category[]>;

    constructor(private http: Http) {
        this.observableCategories = http.get('/api/categories')
            .map(res => res.json())
    }

    getCategories(): Observable<Category[]> {
        return this.observableCategories;
    }

    getCategory(id: string): Observable<Category> {
        return this.observableCategories.map(categories => categories.find(category => category.id == id));
    }
}