import { Category } from "./Category";
import { Model } from "./model";

export class Book extends Model {
    constructor(
        public id: number,
        public isbn: string,
        public title: string,
        public author: string[],
        public categoryId: string,
        public price: number
    ) { super(); }

    static empty(): Book {
        return new Book(null, null, null, [], null, null);
    }

    static from({ id: id, isbn: isbn, title: title, author: author, categoryId: categoryId, price: price}): Book {
        return new Book(id, isbn, title, author, categoryId, price);
    }
}
