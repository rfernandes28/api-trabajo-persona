import { Test, TestingModule } from '@nestjs/testing';
import { CommercialPresentationsService } from './commercial-presentations.service';

describe('CommercialPresentationsService', () => {
  let service: CommercialPresentationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialPresentationsService],
    }).compile();

    service = module.get<CommercialPresentationsService>(CommercialPresentationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
