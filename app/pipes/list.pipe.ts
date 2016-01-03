import { Pipe } from 'angular2/core';

@Pipe({
    name: 'list'
})
export class ListPipe {
    transform(value: any[], args: number[]): string {
        return value.join(', ')
    }
}