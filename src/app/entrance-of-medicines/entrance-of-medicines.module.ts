import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntranceOfMedicinesService } from './entrance-of-medicines.service';
import { EntranceOfMedicinesController } from './entrance-of-medicines.controller';

import { EntranceOfMedicine } from './entities/entrance-of-medicine.entity';
import { MedicinesModule } from '../medicines/medicines.module';

@Module({
  imports: [TypeOrmModule.forFeature([EntranceOfMedicine]), MedicinesModule],
  controllers: [EntranceOfMedicinesController],
  providers: [EntranceOfMedicinesService],
  exports: [EntranceOfMedicinesService],
})
export class EntranceOfMedicinesModule {}
