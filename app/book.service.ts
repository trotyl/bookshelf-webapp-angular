import { Injectable } from 'angular2/core';
import { Book } from "./book";

@Injectable()
export class BookService {
    getBooks(): Book[] {
        return [];
    }
}