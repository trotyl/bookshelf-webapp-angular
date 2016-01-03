import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Book } from "../models/book";
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
    private observableCategories: Observable<Category[]>;
    private cachedCategories: Map<string, Category>;

    constructor(private http: Http) {
        this.cachedCategories = new Map<string, Category>();
        this.observableCategories = http.get('/api/categories')
            .map(res => res.json())
            .do(categories => categories.forEach(category => this.cachedCategories.set(category.id, category)));
    }

    getCategories(): Observable<Category[]> {
        return this.observableCategories;
    }

    getCategory(id: string): Observable<Category> {
        return Observable.create(observer => {
            if (this.cachedCategories.has(id)) {
                observer.next(this.cachedCategories.get(id));
            } else {
                observer.error('Category not found in cache.');
            }
        }).catch(this.observableCategories.map(categories => categories.find(category => category.id == id)));
    }
}
