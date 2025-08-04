import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/books.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  findAllBooks() {
    return this.booksService.findAllBooks();
  }
  @Get(':id')
  findOneBook(@Param() param) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.booksService.findOneBook(param.id);
  }

  @Post()
  async createNewBook(@Body() body: Book) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    await this.booksService.postNewBook(body);
  }
  @Put(':id')
  async updateBook(@Param() param: any, @Body() body: Book) {
    //return `updating of the book ${param.id} in particuliar of these props ${JSON.stringify(body)}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.booksService.updateBook(param.id, body);
  }
  @Delete(':id')
  async removeBook(@Param() param: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.booksService.removeBook(param.id);
  }
}
