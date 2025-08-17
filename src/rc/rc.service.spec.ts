import { Test, TestingModule } from '@nestjs/testing';
import { RcService } from './rc.service';

describe('RcService', () => {
  let service: RcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RcService],
    }).compile();

    service = module.get<RcService>(RcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
