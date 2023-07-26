import { Test, TestingModule } from '@nestjs/testing';
import { PathologiesService } from './pathologies.service';

describe('PathologiesService', () => {
  let service: PathologiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathologiesService],
    }).compile();

    service = module.get<PathologiesService>(PathologiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
