import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { CategoryService } from '../services/services';
import { Category } from '../models/models';

@Component({
    selector: 'navbar',
    template: `
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" [routerLink]="['BookList']">Trotyl's Bookshelf</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a [routerLink]="['BookList']">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li>
                            <a [routerLink]="['BookCreate']">Create Book</a>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li *ngFor="#category of categories"><a [routerLink]="['BookCategory', { category: category.id }]">{{ category?.name }}</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">All</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="navbar-form navbar-left" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="CLR via C#">
                        </div>
                        <button type="submit" class="btn btn-default">Search</button>
                    </form>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">Set Default</a></li>
                        <li><a href="#">Favorite</a></li>
                        <li><a href="#">Help</a></li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
    `,
    directives: [ COMMON_DIRECTIVES, ROUTER_DIRECTIVES ]
})
export class NavbarComponent {
    private categories: Category[];

    constructor(private categoryService: CategoryService) {
        categoryService.getCategories().subscribe(categories => this.categories = categories);
    }
}