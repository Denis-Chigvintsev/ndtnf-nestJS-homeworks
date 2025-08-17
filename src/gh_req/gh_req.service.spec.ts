import { Test, TestingModule } from '@nestjs/testing';
import { GhReqService } from './gh_req.service';

describe('GhReqService', () => {
  let service: GhReqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GhReqService],
    }).compile();

    service = module.get<GhReqService>(GhReqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
