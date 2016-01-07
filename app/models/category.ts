import { Model } from "./model";

export class Category extends Model {
    constructor(
        public id: string,
        public name: string
    ) { super(); }

    static from({ id: id, name: name }): Category {
        return new Category(id, name);
    }
}