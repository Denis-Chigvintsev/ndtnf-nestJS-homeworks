import { Test, TestingModule } from '@nestjs/testing';
import { GhReqController } from './gh_req.controller';

describe('GhReqController', () => {
  let controller: GhReqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GhReqController],
    }).compile();

    controller = module.get<GhReqController>(GhReqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
