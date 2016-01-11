import { Category } from "./Category";
import { Model } from "./model";
import {Author} from "./author";

export class Book extends Model {

    private static empty = new Book(null, null, null, [], null, null);
    private static loading = new Book(null, 'loading...', 'loading...', [], null, null);

    static empty(): Book {
        return Book.empty;
    }

    static from({ id: id, isbn: isbn, title: title, author: author, categoryId: categoryId, price: price}): Book {
        return new Book(id, isbn, title, author, categoryId, price);
    }

    static loading(): Book {
        return Book.loading;
    }

    constructor(
        public id: number,
        public isbn: string,
        public title: string,
        public authorIds: number[],
        public categoryId: string,
        public price: number
    ) { super(); }
}
