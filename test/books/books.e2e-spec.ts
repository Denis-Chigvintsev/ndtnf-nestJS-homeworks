/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { CreateBookDto } from 'src/books/dto/create-book.dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto/update-book.dto';

const testDTO: CreateBookDto = {
  title: 'Аа',
  description: 'Аа бб.',
  authors: ['вв', 'ддд', 'ееее'],
  favorite: true,
  fileCover: 'черная',
  fileName: 'jjj',
};

const updateDTO: UpdateBookDto = {
  title: '1',
  description: '1',
  authors: ['1', '1', '1'],
  favorite: false,
  fileCover: '1',
  fileName: '1',
};

let createdID: string;

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/books/createNewBook POST ', () => {
    return request(app.getHttpServer())
      .post('/books')
      .set('Authorization', `Bearer ${process.env.JWT_FOR_TEST}`)
      .send(testDTO)
      .expect(201)
      .then(({ body }) => {
        createdID = body.id;
        console.log(createdID);
      });
  });

  test('/books/get all books GET ', () => {
    return request(app.getHttpServer())
      .get('/books')
      .set('Authorization', `Bearer ${process.env.JWT_FOR_TEST}`)
      .expect(200);
  });

  test('/books/get a book by :id ', () => {
    return request(app.getHttpServer())
      .get(`/books/` + `${createdID}`)
      .set('Authorization', `Bearer ${process.env.JWT_FOR_TEST}`)
      .expect(200);
  });

  test('/books/:id PUT', () => {
    return request(app.getHttpServer())
      .get(`/books/` + `${createdID}`)
      .set('Authorization', `Bearer ${process.env.JWT_FOR_TEST}`)
      .send(updateDTO)
      .expect(200);
  });

  test('/books/:id delete', () => {
    return request(app.getHttpServer())
      .delete(`/books/` + `${createdID}`)
      .set('Authorization', `Bearer ${process.env.JWT_FOR_TEST}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
