import { Test, TestingModule } from '@nestjs/testing';
import { CommercialPresentationsController } from './commercial-presentations.controller';
import { CommercialPresentationsService } from './commercial-presentations.service';

describe('CommercialPresentationsController', () => {
  let controller: CommercialPresentationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialPresentationsController],
      providers: [CommercialPresentationsService],
    }).compile();

    controller = module.get<CommercialPresentationsController>(CommercialPresentationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
