import { Test, TestingModule } from '@nestjs/testing';
import { EntranceOfMedicinesController } from './entrance-of-medicines.controller';
import { EntranceOfMedicinesService } from './entrance-of-medicines.service';

describe('EntranceOfMedicinesController', () => {
  let controller: EntranceOfMedicinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntranceOfMedicinesController],
      providers: [EntranceOfMedicinesService],
    }).compile();

    controller = module.get<EntranceOfMedicinesController>(
      EntranceOfMedicinesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
