import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesActivePrinciplesController } from './medicines-active-principles.controller';
import { MedicinesActivePrinciplesService } from './medicines-active-principles.service';

describe('MedicinesActivePrinciplesController', () => {
  let controller: MedicinesActivePrinciplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicinesActivePrinciplesController],
      providers: [MedicinesActivePrinciplesService],
    }).compile();

    controller = module.get<MedicinesActivePrinciplesController>(MedicinesActivePrinciplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
