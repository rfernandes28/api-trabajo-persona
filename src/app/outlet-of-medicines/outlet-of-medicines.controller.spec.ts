import { Test, TestingModule } from '@nestjs/testing';
import { OutletOfMedicinesController } from './outlet-of-medicines.controller';
import { OutletOfMedicinesService } from './outlet-of-medicines.service';

describe('OutletOfMedicinesController', () => {
  let controller: OutletOfMedicinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutletOfMedicinesController],
      providers: [OutletOfMedicinesService],
    }).compile();

    controller = module.get<OutletOfMedicinesController>(OutletOfMedicinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
