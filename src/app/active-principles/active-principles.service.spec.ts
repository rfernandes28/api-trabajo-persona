import { Test, TestingModule } from '@nestjs/testing';
import { ActivePrinciplesService } from './active-principles.service';

describe('ActivePrinciplesService', () => {
  let service: ActivePrinciplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivePrinciplesService],
    }).compile();

    service = module.get<ActivePrinciplesService>(ActivePrinciplesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
