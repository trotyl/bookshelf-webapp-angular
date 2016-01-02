import { Component } from 'angular2/core';

@Component({
    selector: 'footer',
    template: `
        <div class="container text-center">
            <p><small>Home | Author | Source</small></p>
            <p><small>© 2016 Trotyl Yu.</small></p>
        </div>
    `,
    styles: ['margin-top: 20px']
})
export class FooterComponent {

}