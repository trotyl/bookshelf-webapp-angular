import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Rx";

@Injectable()
export class Cacher<T> {
    gets<T>(type: any, ids: number[]): Observable<T[]> {
        // Todo
        return null;
    }
}
