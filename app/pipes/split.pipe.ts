import { Pipe } from 'angular2/core';

@Pipe({
    name: 'split'
})
export class SplitPipe {
    transform(value: string, [ regex = ',', trim = true ]): string[] {
        return value ?
            value.split(regex).map(part => part.trim()) :
            [];
    }
}
