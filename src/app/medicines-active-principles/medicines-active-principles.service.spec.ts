import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesActivePrinciplesService } from './medicines-active-principles.service';

describe('MedicinesActivePrinciplesService', () => {
  let service: MedicinesActivePrinciplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicinesActivePrinciplesService],
    }).compile();

    service = module.get<MedicinesActivePrinciplesService>(MedicinesActivePrinciplesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
