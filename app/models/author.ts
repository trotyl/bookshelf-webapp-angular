import {Model} from "./model";

export class Author extends Model {
    static loading(): Author {
        return new Author(null, 'Loading...')
    }

    constructor(
        id: number,
        public name: string
    ) { super(id); }
}
