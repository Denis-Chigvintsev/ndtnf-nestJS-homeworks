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
  findOneBook(@Param() param): Book | string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.booksService.findOneBook(param.id);
  }

  @Post()
  createNewBook(@Body() body: Book): Book {
    return this.booksService.postNewBook(body);
  }
  @Put(':id')
  updateBook(@Param() param: any, @Body() body: Book): Book | string {
    //return `updating of the book ${param.id} in particuliar of these props ${JSON.stringify(body)}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.booksService.updateBook(param.id, body);
  }
  @Delete(':id')
  removeBook(@Param() param: any): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.booksService.removeBook(param.id);
  }
}
