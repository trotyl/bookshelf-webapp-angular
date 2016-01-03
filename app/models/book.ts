import { Category } from "./Category";

export interface Book {
    isbn: string,
    title: string,
    author: string[],
    category: Category,
    price: number
}
