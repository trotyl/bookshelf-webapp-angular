import { Pipe } from 'angular2/core';

@Pipe({
    name: 'range'
})
export class RangePipe {
    transform(value: number, args: number[]): number[] {
        var result: number[] = [];
        var i = args[0] || 0;
        while(i < value) {
            result.push(i);
            i++;
        }

        return result;
    }
}
