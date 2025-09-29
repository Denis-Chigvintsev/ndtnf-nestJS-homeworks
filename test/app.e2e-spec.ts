import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  test('/ (GET) --- проеряю вцелом среду nestJS', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${process.env.JWT_FOR_TEST}`)
      .expect(200)
      .expect('Hello World!');
  });
});
