import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<User>,
  ) {}

  /// ниже CRUD методы

  findAllBooks() {
    return this.bookModel.find();
  }

  async findOneBook(id: string) {
    const book = await this.bookModel.findOne({ id: id });

    if (!book) {
      throw new NotFoundException(`no Book with id ${id}`);
    }
    return book;
  }

  postNewBook(book) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    book.id = uuidv4();
    const book1 = new this.bookModel(book);
    return book1.save();
  }
  async updateBook(id: string, book) {
    const existingBook1 = await this.bookModel
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      .findOneAndUpdate({ id: id }, { $set: book }, { new: true });

    if (!existingBook1) {
      throw new NotFoundException(`no Book with id ${id}`);
    }

    return existingBook1;
  }
  async removeBook(id: string) {
    const book1 = await this.bookModel.findOneAndDelete({ id: id });
    if (!book1) {
      throw new NotFoundException(`no Book with id ${id} или книга не удалена`);
    } else return book1;
  }
}
