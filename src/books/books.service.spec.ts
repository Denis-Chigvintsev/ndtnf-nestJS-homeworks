/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './entities/books.entity';

describe('BooksService', () => {
  let service: BooksService;

  const mockStore = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getModelToken(Book.name), useValue: mockStore },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  test('проверяю что вцелом определяется класс  BookService', () => {
    expect(service).toBeDefined();
  });

  test('проверяю что книга создается', async () => {
    ////

    const bookDTO1 = {
      title: 'Аа',
      description: 'Аа бб.',
      authors: ['вв', 'ддд', 'ееее'],
      favorite: true,
      fileCover: 'черная',
      fileName: 'jjj',
      id: 'aaaa-ddddd-dddd-d3333-vvvv',
    };
    const bookDTO1_created: any = {
      title: 'Аа',
      description: 'Аа бб.',
      authors: ['вв', 'ддд', 'ееее'],
      favorite: true,
      fileCover: 'черная',
      fileName: 'jjj',
      id: 'aaaa-ddddd-dddd-d3333-vvvv',
    };

    const bookDTO2 = {
      title: 'Аа',
      description: 'Аа бб.',
      authors: ['вв', 'ддд', 'ееее'],
    };

    const bookDTO2_created: any = {
      title: 'Аа',
      description: 'Аа бб.',
      authors: ['вв', 'ддд', 'ееее'],
    };

    ////

    let spy = jest
      .spyOn(service, 'postNewBook')
      .mockResolvedValue(bookDTO1_created);

    let result = await service.postNewBook(bookDTO1);

    expect(spy).toHaveBeenCalled();

    expect(result).toEqual(bookDTO1_created);

    jest.clearAllMocks();

    spy = jest
      .spyOn(service, 'postNewBook')
      .mockResolvedValue(bookDTO2_created);

    result = await service.postNewBook(bookDTO2);

    expect(spy).toHaveBeenCalled();

    expect(result).toEqual(bookDTO2_created);
  });

  test('проверяю что возвращает список всех книг', async () => {
    const books: any = [
      {
        title: 'Аа',
        description: 'Аа бб.',
        authors: ['вв', 'ддд', 'ееее'],
        favorite: true,
        fileCover: 'черная',
        fileName: 'jjj',
        id: 'aaaa-ddddd-dddd-d3333-vvvv',
      },
    ];
    jest.spyOn(service['bookModel'], 'find').mockResolvedValue(books);
    const result = await service.findAllBooks();
    expect(result).toEqual(books);
  });

  test('проверяю что возвращает одну книгу', async () => {
    const book: any = {
      title: 'Аа',
      description: 'Аа бб.',
      authors: ['вв', 'ддд', 'ееее'],
      favorite: true,
      fileCover: 'черная',
      fileName: 'jjj',
      id: 'aaaa-ddddd-dddd-d3333-vvvv',
    };
    jest.spyOn(service['bookModel'], 'findOne').mockResolvedValue(book);
    const result = await service.findOneBook('aaaa-ddddd-dddd-d3333-vvvv');
    expect(result).toEqual(book);
  });

  test('проверяю что удаляет одну книгу', async () => {
    const book: any = {
      title: 'Аа',
      description: 'Аа бб.',
      authors: ['вв', 'ддд', 'ееее'],
      favorite: true,
      fileCover: 'черная',
      fileName: 'jjj',
      id: 'aaaa-ddddd-dddd-d3333-vvvv',
    };
    jest
      .spyOn(service['bookModel'], 'findOneAndDelete')
      .mockResolvedValue(book);
    const result = await service.removeBook('aaaa-ddddd-dddd-d3333-vvvv');
    expect(result).toEqual(book);
  });

  test('проверяю что произвожу редактирование одной книжки', async () => {
    const book: any = {
      title: 'Аа',
      description: 'Аа бб.',
      authors: ['вв', 'ддд', 'ееее'],
      favorite: true,
      fileCover: 'черная',
      fileName: 'jjj',
      id: 'aaaa-ddddd-dddd-d3333-vvvv',
    };

    const updatedBook = {
      title: 'NEW',
      description: 'NEW1.',
      authors: ['вв', 'ддд', 'ееее'],
      favorite: true,
      fileCover: 'черная',
      fileName: 'jjj',
      id: 'aaaa-ddddd-dddd-d3333-vvvv',
    };

    jest.spyOn(service['bookModel'], 'findOne').mockResolvedValue(book);

    jest
      .spyOn(service['bookModel'], 'findOneAndUpdate')
      .mockResolvedValue(updatedBook);

    const result = await service.updateBook(
      'aaaa-ddddd-dddd-d3333-vvvv',
      updatedBook,
    );
    expect(result).toEqual(updatedBook);
  });
});
