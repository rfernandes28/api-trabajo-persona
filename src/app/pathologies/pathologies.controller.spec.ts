import { Test, TestingModule } from '@nestjs/testing';
import { PathologiesController } from './pathologies.controller';
import { PathologiesService } from './pathologies.service';

describe('PathologiesController', () => {
  let controller: PathologiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PathologiesController],
      providers: [PathologiesService],
    }).compile();

    controller = module.get<PathologiesController>(PathologiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
