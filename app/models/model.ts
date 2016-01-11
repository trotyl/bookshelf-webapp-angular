export abstract class Model {

    public updatedAt: number;

    constructor(
        public id: number
    ) {
        this.updatedAt = (new Date).valueOf();
    }

    toJson(): string {
        return JSON.stringify(this);
    }
}
