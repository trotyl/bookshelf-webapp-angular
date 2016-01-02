import { Pipe } from 'angular2/core';

@Pipe({
    name: 'range'
})
export class RangePipe {
    transform(value: number, args: number[]): number[] {
        var result: number[] = [];
        let start = args[0] || 0;
        var i = 0;
        while(i < value) {
            result.push(i + start);
            i++;
        }

        return result;
    }
}
