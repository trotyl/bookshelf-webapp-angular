import { Component, Input } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RangePipe } from '../pipes/range.pipe';

@Component({
    selector: 'pagination',
    template: `
        <nav class="text-center">
          <ul class="pagination">
            <li [ngClass]="{ disabled: current <= 1 }">
              <a [routerLink]="current > 2 ? ['BookListPage', { page: current - 1 }] : ['BookList']" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li *ngFor="#page of total | range:1" [ngClass]="{ active: page == current }" (click)="current = page">
                <a [routerLink]="page > 1 ? ['BookListPage', { page: page }] : ['BookList']">{{ page }}</a>
            </li>
            <li [ngClass]="{ disabled: current >= total }">
              <a [routerLink]="['BookListPage', { page: current + 1 }]" aria-label="Next">
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
}