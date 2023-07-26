import { Test, TestingModule } from '@nestjs/testing';
import { ActivePrinciplesController } from './active-principles.controller';
import { ActivePrinciplesService } from './active-principles.service';

describe('ActivePrinciplesController', () => {
  let controller: ActivePrinciplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivePrinciplesController],
      providers: [ActivePrinciplesService],
    }).compile();

    controller = module.get<ActivePrinciplesController>(ActivePrinciplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
