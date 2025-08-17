import { Test, TestingModule } from '@nestjs/testing';
import { RcController } from './rc.controller';

describe('RcController', () => {
  let controller: RcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RcController],
    }).compile();

    controller = module.get<RcController>(RcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
