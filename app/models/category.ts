import { Model } from "./model";

export class Category extends Model {

    static from({ id: id, name: name }): Category {
        return new Category(id, name);
    }

    static loading(): Category {
        return new Category(null, 'Loading...');
    }

    constructor(
        public id: number,
        public name: string
    ) { super(); }
}
