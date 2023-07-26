import { Test, TestingModule } from '@nestjs/testing';
import { EntranceOfMedicinesService } from './entrance-of-medicines.service';

describe('EntranceOfMedicinesService', () => {
  let service: EntranceOfMedicinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntranceOfMedicinesService],
    }).compile();

    service = module.get<EntranceOfMedicinesService>(EntranceOfMedicinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
