import { Pipe } from 'angular2/core';

@Pipe({
    name: 'range'
})
export class RangePipe {
    transform(value: number, [ start = 0, ...rest ]): number[] {
        var result: number[] = [];
        var i = 0;
        while(i < value) {
            result.push(i + start);
            i++;
        }

        return result;
    }
}
