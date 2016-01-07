import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Book, Category } from '../models/models';

@Injectable()
export class CategoryService {

    private cachedCategories: Map<string, Category> = new Map<string, Category>();
    private observableCategories: Observable<Category[]> = this.getsOffline()
        .catch(() => this.getsOnline());

    constructor(private http: Http) {
        this.getsOnline().subscribe(() => {});
    }

    private getOnline(id: string): Observable<Category> {
        return this.http.get(`/api/categories/${id}`)
            .map(res => res.json())
            .map(obj => Category.from(obj));
    }

    private getOffline(id: string): Observable<Category> {
        return this.cachedCategories.has(id) ?
            Observable.of(this.cachedCategories.get(id)) :
            Observable.throw<Category>(new Error('Category not found in cache.'));
    }

    private getsOnline(): Observable<Category[]> {
        return this.http.get(`/api/categories`)
            .map(res => res.json())
            .map(objs => objs.map(obj => Category.from(obj)))
            .do(categories => categories.forEach(category => this.cachedCategories.set(category.id, category)));
    }

    private getsOffline(): Observable<Category[]> {
        return this.cachedCategories.size != 0 ?
            Observable.of(Array.from(this.cachedCategories.values())) :
            Observable.throw<Category[]>(new Error('Categories not found in cache.'));
    }

    get(id: string): Observable<Category> {
        return this.getOffline(id)
            .catch(() => this.getOnline(id));
    }

    gets(): Observable<Category[]> {
        return this.observableCategories;
    }
}
