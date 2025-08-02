import { Injectable } from '@nestjs/common';
import { Book } from './entities/books.entity';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  /// ниже CRUD методы

  findAllBooks(): Book[] {
    return this.books;
  }
  findOneBook(id: string): Book | string {
    const index: number = this.books.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (e: Book) => e.id === id,
    );
    console.log(index);
    if (index !== -1) {
      return this.books[index];
    } else {
      return 'no such an element';
    }
  }
  postNewBook(book: Book): Book {
    this.books.push(book);
    return book;
  }
  updateBook(id: string, book: Book): Book | string {
    const index: number = this.books.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (e: Book) => e.id === id,
    );
    console.log(index);
    if (index !== -1) {
      this.books[index] = book;
      return this.books[index];
    } else return 'Nepravilno nabran nomer';
  }
  removeBook(id: string): string {
    const index: number = this.books.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (e: Book) => e.id === id,
    );
    console.log(index);
    if (index !== -1) {
      this.books.splice(index, 1);
      return 'book deleted';
    } else return 'book not deleted due to incorrect id';
  }
}
