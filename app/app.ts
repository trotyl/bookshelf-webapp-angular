import { Component } from 'angular2/core';
import { Navbar } from 'app/navbar';

@Component({
    selector: 'app',
    template: `
        <navbar></navbar>
        <h1>Trotyl's Bookshelf</h1>
    `,
    directives: [ Navbar ]
})
export class App {

}