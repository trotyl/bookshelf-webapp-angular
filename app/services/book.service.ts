import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { Book } from "../models/book";
import { Category } from '../models/category';


@Injectable()
export class BookService {
    getBooks(start: number = 0, amount: number = 10): Book[] {
        var category: Category = { id: 0, name: 'Computer & Technology' };

        var books = [
            { isbn: '9787302380979', title: 'CLR via C#', author: ['Jeffrey Richter'], category: category, price: 59.99 },
            { isbn: '9781617291340', title: 'C# in Depth', author: ['Jon Skeet'], category: category, price: 33.98 },
            { isbn: '9780321714114', title: 'C++ Primer', author: ['Stanley B. Lippman', 'Josée Lajoie', 'Barbara E. Moo'], category: category, price: 43.74 },
            { isbn: '8601300201986', title: 'Effective Java', author: ['Joshua Bloch'], category: category, price: 29.69 }
        ];

        return books.filter((book, index) => index >= start && index < start + amount);
    }
}