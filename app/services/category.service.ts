import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Book } from "../models/book";
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

    getCategoryById(id: number): Category {
        return {
            id: id,
            name: 'Computer & Technology'
        };
    }
}