import { Injectable } from 'angular2/core';
import {BehaviorSubject, Observable} from "rxjs/Rx";
import { default as _ } from "lodash";


class Cacher<T> {
    gets<T>(type: any, ids: number[]): Observable<T> {
        return null;
    }
}
class Fetcher<T> {
    get<T>(type: any, id: number): Observable<T> {
        return null;
    }

    gets<T>(type: any, ids: number[]): Observable<T> {
        return null;
    }
}

@Injectable()
export class Dispatcher<T> {

    constructor(
        private cacher: Cacher<T>,
        private fetcher: Fetcher<T>
    ) { }

    get(ids: number[]) {
        let currentItems: T[] = new Array(ids.length).fill(T.loading());
        let subject = new BehaviorSubject<T[]>(currentItems);
        this.cacher.gets<T>(T, ids)
            .do(items => {
                currentItems = _.clone(currentItems);
                items.forEach(item => item && (currentItems[ids.indexOf(item.id)] = item));
                subject.next(currentItems);
            })
            .do(items => this.fetcher.gets<T[]>(T, items.map((item, i) => ({ item: item, i: i } ))
                                                        .filter(tuple => !tuple.item)
                                                        .map(tuple => tuple.id))
                             .do(items => {
                                 currentItems = _.clone(currentItems);
                                 items.forEach(item => item && (currentItems[ids.indexOf(item.id)] = item));
                                 subject.next(currentItems);
                             }))
            .subscribe();

        return subject;
    }
}
