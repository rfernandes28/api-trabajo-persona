import { Test, TestingModule } from '@nestjs/testing';
import { OutletOfMedicinesService } from './outlet-of-medicines.service';

describe('OutletOfMedicinesService', () => {
  let service: OutletOfMedicinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutletOfMedicinesService],
    }).compile();

    service = module.get<OutletOfMedicinesService>(OutletOfMedicinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
