import { Injectable } from 'angular2/core';
import {BehaviorSubject, Observable, Subject} from "rxjs/Rx";
import * as _ from "lodash";
import {Model} from "../models/model";
import {Cacher} from "./cacher.service";
import {Fetcher} from "./fetcher.service";

@Injectable()
export class Dispatcher<T extends Model> {

    constructor(
        private cacher: Cacher<T>,
        private fetcher: Fetcher<T>
    ) { }

    get(type: any, ids: number[]) {
        let currentItems: T[] = new Array(ids.length).fill(type.loading());
        let subject: Subject<T[]> = new BehaviorSubject<T[]>(currentItems);
        this.cacher.gets<T>(type, ids)
            .do(items => {
                currentItems = _.clone(currentItems);
                items.forEach(item => item && (currentItems[ids.indexOf(item.id)] = item));
                subject.next(currentItems);
            })
            .do(items => this.fetcher.gets<T>(type, items.map((item, i) => ({ item: item, i: i } ))
                                                           .filter(tuple => !tuple.item)
                                                           .map(tuple => ids[tuple.i]))
                             .do(items => {
                                 currentItems = _.clone(currentItems);
                                 items.forEach(item => item && (currentItems[ids.indexOf(item.id)] = item));
                                 subject.next(currentItems);
                             }))
            .subscribe();

        return subject;
    }
}
