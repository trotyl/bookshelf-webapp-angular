import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RangePipe } from '../pipes/pipes';

@Component({
    selector: 'pagination',
    template: `
        <nav class="text-center">
          <ul class="pagination">
            <li [ngClass]="{ disabled: current <= 1 }">
              <a (click)="turnPage(current - 1)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li *ngFor="#page of total | range:1" [ngClass]="{ active: page == current }" (click)="current = page">
                <a (click)="turnPage(page)">{{ page }}</a>
            </li>
            <li [ngClass]="{ disabled: current >= total }">
              <a (click)="turnPage(current + 1)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
    `,
    directives: [ COMMON_DIRECTIVES, ROUTER_DIRECTIVES ],
    pipes: [ RangePipe ]
})
export class PaginationComponent {
    @Input() private current: number;
    @Input() private total: number;
    @Output() private pageTurn: EventEmitter<number> = new EventEmitter();

    turnPage(page: number) {
        this.pageTurn.emit(page);
    }
}