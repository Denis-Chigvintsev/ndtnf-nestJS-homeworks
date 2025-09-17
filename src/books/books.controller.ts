import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto/update-book.dto';

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
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Post()
  async createNewBook(@Body() createBookDto: CreateBookDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.booksService.postNewBook(createBookDto);
  }

  @Put(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateBook(
    @Param() param: any,
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateBookDto: UpdateBookDto,
  ) {
    //return `updating of the book ${param.id} in particuliar of these props ${JSON.stringify(body)}`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return await this.booksService.updateBook(param.id, updateBookDto);
  }
  @Delete(':id')
  async removeBook(@Param() param: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    await this.booksService.removeBook(param.id);
  }
}
