import {Observable} from "rxjs/Rx";
import {Injectable} from "angular2/core";

@Injectable()
export class Fetcher<T> {
    gets<T>(type: any, ids: number[]): Observable<T[]> {
        // Todo
        return null;
    }
}
