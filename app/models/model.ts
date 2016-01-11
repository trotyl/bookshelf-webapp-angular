export abstract class Model {

    constructor(
        public id: number
    ) { }

    toJson(): string {
        return JSON.stringify(this);
    }
}
