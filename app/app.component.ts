import { Component } from 'angular2/core';
import { NavbarComponent } from 'app/navbar.component';

@Component({
    selector: 'app',
    template: `
        <navbar></navbar>
        <h1>Trotyl's Bookshelf</h1>
    `,
    directives: [ NavbarComponent ]
})
export class AppComponent {

}