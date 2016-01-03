import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Book, Category } from '../models/models';

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
        let observableCachedCategories: Observable<any> = this.cachedCategories && this.cachedCategories.size != 0 ?
            Observable.of(Array.from(this.cachedCategories.values())) :
            Observable.throw(new Error('Books not found in cache.'));

        return observableCachedCategories.catch(() => this.observableCategories);
    }

    getCategory(id: string): Observable<Category> {
        let observableCachedCategory: Observable<any> = this.cachedCategories && this.cachedCategories.has(id) ?
            Observable.of(this.cachedCategories.get(id)) :
            Observable.throw(new Error('Category not found in cache.'));

        return observableCachedCategory.catch(() => this.observableCategories.map(categories => categories.find(category => category.id == id)));
    }
}
