import { Category } from "./Category";
import { Model } from "./model";

export class Book extends Model {
    constructor(
        public isbn: string,
        public title: string,
        public author: string[],
        public categoryId: string,
        public price: number
    ) { super(); }

    static empty(): Book {
        return new Book(null, null, [], null, null);
    }

    static from({ isbn: isbn, title: title, author: author, categoryId: categoryId, price: price}): Book {
        return new Book(isbn, title, author, categoryId, price);
    }
}
