import { Pipe } from 'angular2/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import { CategoryService } from "../services/category.service";

@Pipe({
    name: 'categoryName'
})
export class CategoryNamePipe {
    constructor(private categoryService: CategoryService) {}

    transform(id: string, args: number[]): Observable<string> {
        return this.categoryService.getCategory(id).map(category => category.name);
    }
}
