export abstract class Model {
    toJson(): string {
        return JSON.stringify(this);
    }
}
