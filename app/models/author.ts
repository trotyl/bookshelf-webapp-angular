export class Author {
    static loading(): Author {
        return new Author(null, 'Loading...')
    }

    constructor(
        public id: number,
        public name: string
    ) { }
}
